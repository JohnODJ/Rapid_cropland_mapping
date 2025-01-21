var aoi1: Table projects/ee-oderajaoko/assets/Narok
var crop: FeatureCollection (364 elements)
var other: FeatureCollection (215 elements)


// Load Sentinel-2 ImageCollection and filter by date and bounds
var sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterBounds(aoi1);

// Define date ranges for bi-weekly periods
var dateRanges = [
  ['2023-03-01', '2023-03-15'], ['2023-03-16', '2023-03-31'],
  ['2023-04-01', '2023-04-15'], ['2023-04-16', '2023-04-30'],
  ['2023-05-01', '2023-05-15'], ['2023-05-16', '2023-05-31'],
  ['2023-06-01', '2023-06-15'], ['2023-06-16', '2023-06-30'],
  ['2023-07-01', '2023-07-15'], ['2023-07-16', '2023-07-31'],
  ['2023-08-01', '2023-08-15'], ['2023-08-16', '2023-08-31']
];

// Cloud masking function for Sentinel-2 SR
var maskS2Clouds = function(image) {
  var shadow = image.select('SCL').eq(3); // Cloud shadows
  var cirrus = image.select('SCL').eq(10); // Cirrus clouds
  var mask = image.select('QA60').not() // Cloud mask
              .and(shadow.not())
              .and(cirrus.not());
  return image.updateMask(mask).copyProperties(image, ["system:time_start"]);
};

// Function to compute NDVI and get the greenest pixel composite with cloud mask
var computeGreenestComposite = function(dateRange) {
  var filtered = sentinel2.filterDate(dateRange[0], dateRange[1]);

  // Apply cloud mask using the maskS2Clouds function
  filtered = filtered.map(maskS2Clouds);

  var withNDVI = filtered.map(function(img) {
    var ndvi = img.expression(
      '(B8 - B4) / (B8 + B4)', {
        'B8': img.select('B8'), // NIR band
        'B4': img.select('B4')  // Red band
      }
    ).rename('NDVI');
    return img.addBands(ndvi);
  });

  var mosaic = withNDVI.qualityMosaic('NDVI');
  return mosaic.addBands(mosaic.select('NDVI')).select(['B2', 'B3', 'B4', 'B5', 'B8', 'B11', 'B12', 'NDVI']).clip(aoi1);
};

// Compute greenest composites for each date range
var greenestComposites = dateRanges.map(computeGreenestComposite);

// Compute NDVI for each greenest composite
var ndviBands = greenestComposites.map(function(img, index) {
  return img.select('NDVI').rename('NDVI' + (index + 1));
});

// Stack NDVI bands
var stackedNDVI = ee.ImageCollection(ndviBands).toBands().multiply(100).add(100).uint8();

// Visualize stacked NDVI
Map.addLayer(stackedNDVI, {bands: ['8_NDVI9', '5_NDVI6', '2_NDVI3'], min: 0, max: 200}, 'Stacked_NDVI');

// Visualize a specific greenest composite
Map.addLayer(greenestComposites[5], {bands: ['B8', 'B4', 'B3'], min: 0, max: 4000}, 'Sen_Jun1FN');

// Merge crop and other feature collections
var trainingFeatures = crop.merge(other);

// Sample training data
var trainingData = stackedNDVI.sampleRegions({
  collection: trainingFeatures,
  properties: ['class'],
  scale: 30
});

// Train classifier
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: trainingData,
  classProperty: 'class'
});

// Classify the stacked NDVI
var classified = stackedNDVI.classify(classifier, 'Classified');

// Mask for class 1 and visualize
var classified1 = classified.updateMask(classified.eq(1));
Map.addLayer(classified1, {palette: ['yellow'], min: 0, max: 1}, 'Classified');


Map.centerObject(aoi1, 10);

// Export the classified image
Export.image.toDrive({
  image: classified1.clip(aoi1),
  description: 'classified_image',
  folder: 'GEE_exports',
  region: aoi1.geometry().bounds(),
  scale: 30,
  crs: 'EPSG:4326'
});


// Exporting the labels created using Geometry Imports to Assets
Export.table.toAsset(crop, 
  'crop_narok', 
  'projects/ee-classes24/assets/crop_narok', 
  10 // Adjust maxVertices as needed
);

Export.table.toAsset(other, 
  'other_narok', 
  'projects/ee-classes24/assets/other_narok', 
  10 // Adjust maxVertices as needed
);
