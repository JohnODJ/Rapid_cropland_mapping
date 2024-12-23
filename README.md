# Rapid Cropland Mapping and Sampling for Crop Type Mapping

**Prepared by:** John Jaoko  
**Date:** 27/06/2024  

---

## Overview

This document provides a summary of the methodology used to classify cropland and non-cropland areas for rapid cropland mapping. The approach leverages Sentinel-2 satellite imagery, Normalized Difference Vegetation Index (NDVI), and machine learning techniques in Google Earth Engine.
---

## 1. Approach to Classify Cropland
### Key Features:
- **Data Source**: Sentinel-2 imagery from March to August 2023 (long rain season).
- **ROI**: Focused on agricultural regions like Bahati Sub-county in Nakuru.
- **Indicators**: NDVI and greenest pixel composites to identify vegetation patterns.
- **Classes**: Cropland (annual crops) and non-cropland.
- **Classifier**: Random Forest algorithm trained on NDVI values and spectral indices.

### Steps:
1. **Preprocessing**: Temporal NDVI analysis to detect phenological patterns of crops.
2. **Training Data**: Label ROI based on NDVI trends and visual inspection.
3. **Validation**: Verify cropland and non-cropland areas using phenological signatures and reference imagery.
4. **Classification**: Random Forest classifier applied to stacked NDVI images.
5. **Export**: Classified image exported as GeoTIFF for GIS integration.

### Outputs:
- **Figures**:
  - Figure 1: NDVI stacked images for cropland and non-cropland differentiation.
    Illustrates how NDVI stacks are used to distinguish cropland from non-cropland.
![Figure 1](https://github.com/user-attachments/assets/212d3b8d-0139-4d71-91d2-591dca2780eb)
  - Figure 2: NDVI signatures for various land uses.
    Shows NDVI patterns for cropland and other land-use types.
![Figure 2](https://github.com/user-attachments/assets/da6ea5ed-37d4-4a93-80e7-80459682607b)
  - Figure 3: Final classified image.
    Displays the output cropland and non-cropland classifications.
![Figure 3](https://github.com/user-attachments/assets/5c189835-2103-49af-957e-0b30baf88871)

---

## 2. Methodology for Mapping Cropland

### Step 1: Setting Up Image Collections
- Dataset: `COPERNICUS/S2_SR_HARMONIZED`.
- Timeframe: March to August 2023, divided into 15-day periods.
- Filters: Date and bounds to include relevant data for the AOI.

### Step 2: Calculating NDVI
- NDVI Formula: `(NIR - Red) / (NIR + Red)`.
- Applied to each image in the collection to highlight vegetation density.

### Step 3: Creating Greenest Pixel Composites
- Identify the highest NDVI value for each pixel.
- Clip to AOI and create a stacked NDVI image.
- Scale and convert to 8-bit unsigned integer format for compatibility.

### Step 4: Training and Applying a Classifier
- Training Data: Labeled ground truth data.
- Classifier: Random Forest algorithm.
- Workflow:
  - Merge labeled data.
  - Sample training data.
  - Train classifier.
  - Apply to stacked NDVI image.
  
- Export Results: Classified image exported as a GeoTIFF file to Google Drive.

- ## Technical Details
### Code and Tools
- Platform: Google Earth Engine.
- Programming: JavaScript API in Earth Engine Code Editor.
- Outputs: GeoTIFF classified image

### Recommended Practices
- Use high-quality training data for better classification accuracy.
- Validate the results using ground-truth data or secondary datasets.
- Incorporate quality masks (e.g., cloud cover) for preprocessing.






















