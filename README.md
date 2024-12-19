# Rapid Cropland Mapping and Sampling for Crop Type Mapping

**Prepared by:** John Jaoko  
**Date:** 27/06/2024  

---

## Overview

This methodology outlines an approach to classify cropland and non-cropland using Earth Engine and Sentinel-2 satellite imagery. It leverages crop phenology, temporal analysis, and vegetation indices to identify crop and non-crop areas. Designed for rapid assessment, the process supports fieldwork for crop type labeling, focusing on annual croplands critical for food security.
---

## Methodology

### Step 1: Setting Up Image Collections
- Use the "COPERNICUS/S2_SR_HARMONIZED" dataset for Sentinel-2 imagery.
- Define the **Region of Interest (ROI)** and focus on agricultural growing seasons (e.g., March to August for long rain season in the parts of the Rft Valley in Kenya).
- Divide the dataset into 15-day periods to enable detailed temporal analysis.
- Filter image collections by date and spatial bounds for relevant data.

### Step 2: Calculating NDVI
- Compute the **Normalized Difference Vegetation Index (NDVI)** to assess vegetation health.
- **NDVI Formula:**
- NDVI = (NIR - RED) / (NIR + RED) 

- Apply an NDVI calculation function to each image collection.

### Step 3: Creating Greenest Pixel Composites
- Extract pixels with the highest NDVI values to generate greenest pixel composites.
- Clip composites to the ROI and combine them into a single stacked NDVI image.
- Scale the image and convert it into an 8-bit unsigned integer format.

### Step 4: Training and Applying a Classifier
- Use labeled data to train a **Random Forest Classifier** with NDVI and spectral indices as features.
- Apply the classifier to the stacked NDVI image to classify the region into **cropland** and **non-cropland**.
- Export the classified image as a GeoTIFF file for GIS integration.

---

## Rapid Cropland Mapping Details

### Data Preprocessing
- **Greenest Pixel Extraction:** Highlight active vegetation areas.
- **Temporal NDVI Analysis:** Identify crop growth stages and validate against expected patterns.
- **Quality Mosaicking:** Generate composites with minimal cloud and shadow interference.

### Training Data Sampling
- Label training data using NDVI and seasonal greenness trends.
- Validate phenological patterns based on NDVI trends (e.g., cropland exhibits distinct green, yellow, and orange colors).
- Use satellite imagery for context in stable land-use areas like forests or urban settlements.

### Classification
The classification process includes two classes:
1. **Cropland:** Annual crops critical for livelihoods.
2. **Non-Cropland:** Areas without significant crop cultivation.

---

## Outputs

1. **NDVI Signatures:** Visualizations of NDVI trends for various land uses.
2. **Classified Image:** A cropland and non-cropland map for the ROI.

---

## Applications

- **Fieldwork Guidance:** Identifies cropland-dominant areas for crop type labeling.
- **GIS Integration:** Enables advanced spatial analysis and decision-making.
- **Food Security Monitoring:** Tracks annual cropland for livelihood sustainability.

---

## Tools and Resources

- **Google Earth Engine (GEE):** For remote sensing and visualization.
- **Sentinel-2 Data:** High-resolution imagery for vegetation analysis.
- **Random Forest Classifier:** Machine learning model for classification.
- **NDVI Analysis:** Core vegetation index for identifying cropland.

---

## Figures

### Figure 1: Using Stacked NDVI Images
Illustrates how NDVI stacks are used to distinguish cropland from non-cropland.
![Figure 1](https://github.com/user-attachments/assets/212d3b8d-0139-4d71-91d2-591dca2780eb)

### Figure 2: NDVI Signatures for Different Land Uses
Shows NDVI patterns for cropland and other land-use types.
![Figure 2](https://github.com/user-attachments/assets/da6ea5ed-37d4-4a93-80e7-80459682607b)

### Figure 3: Final Classified Image
Displays the output cropland and non-cropland classifications.

---

