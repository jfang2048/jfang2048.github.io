# GIS_Lab_Group1_Germany

# Mapping Air Quality in Germany

GIS laboratory project. Land cover transitions, pollutant change (2021-2023), and population exposure for Germany.

## Data

- **CAMS European Air Quality Reanalysis** — NO₂, PM₂.₅, PM₁₀ monthly fields, ~0.1°
- **ESRI 10 m Annual Land Cover** — 2021 and 2023 tiles from ArcGIS Living Atlas
- **WorldPop 2023** — unconstrained population counts, 100 m
- **GAUL Level 2** — 402 administrative districts

## Processing

QGIS with GRASS modules (`r.series`, `r.null`, `r.quantile`) and Raster Calculator. Working CRS WGS84 (EPSG:4326); land cover area stats use EPSG:3035 equal area.

1. NetCDF import, monthly aggregation, annual averaging, EU concentration classification
2. AMAC maps: `POLLUTANT_2023 − POLLUTANT_2021`
3. Land cover change encoding: `(LC_2021 × 100) + LC_2023`, binary masks per assigned class
4. Zonal statistics on AMAC by transition zone (Stable, Gain, Loss)
5. Bivariate exposure: `pol_class_max × 10 + pop_class_median`, dissolved chart layers

## Assigned pollutant-class pairs

| Pollutant | Land cover class | Code |
|-----------|-----------------|------|
| NO₂ | Built Area | 7 |
| PM₂.₅ | Crops | 5 |
| PM₁₀ | Trees | 2 |

## Outputs

- 2023 annual average and concentration class maps (GeoTIFF)
- AMAC maps 2021-2023 (GeoTIFF)
- Land cover transition maps and binary masks
- Zonal statistics (GeoPackage)
- Bivariate population exposure layers (GeoPackage)
- Dissolved chart layers (GeoPackage)
- Website: Home, Workflow, Results, WebGIS (HTML + OpenLayers)


## Key results

All three AMAC means are negative over valid pixels: NO₂ −1.765, PM₂.₅ −1.229, PM₁₀ −1.657 µg/m³. Transition zone means are negative across all pollutant and class pairs. Tree persistence 96.7%. Built Area extent grew by ~877 km² from 2021 to 2023.
