# SYAN.EARTH Data Sources Documentation

This document catalogs all data sources integrated into the SYAN.EARTH Climate Intelligence Platform.

---

## Overview

| Category | Sources | Date Range | Primary Use |
|----------|---------|------------|-------------|
| UK/Global Historical | 8 | 1659-2025 | Long-term climate correlations |
| Tampa Bay Regional | 8 | 1941-2025 | HAB prediction & monitoring |
| **Total** | **24** | **366 years** | **Cross-domain analysis** |

---

## UK/Global Historical Sources

### 1. HadCET (Hadley Centre Central England Temperature)

- **Organization:** UK Met Office
- **Date Range:** 1659-2024
- **Records:** 133,000+
- **Parameters:** Daily mean temperature
- **Resolution:** Daily
- **URL:** https://www.metoffice.gov.uk/hadobs/hadcet/
- **Unique Value:** Longest instrumental temperature record in the world
- **SYAN.EARTH Use:** Baseline climate variability, multi-century trend analysis

### 2. Weather Rescue 1861

- **Organization:** Zooniverse / Met Office collaboration
- **Date Range:** 1861-1875
- **Records:** 3.6M+ observations
- **Parameters:** Pressure, temperature, weather conditions
- **Resolution:** Sub-daily
- **URL:** https://www.zooniverse.org/projects/edh/weather-rescue
- **Unique Value:** Victorian-era digitized ship logs, fills data gaps
- **SYAN.EARTH Use:** Historical baseline, North Atlantic patterns

### 3. Met Office Historic Station Data

- **Organization:** UK Met Office
- **Date Range:** 1853-2024
- **Records:** 10M+
- **Parameters:** Temperature, rainfall, sunshine, wind
- **Resolution:** Daily/Monthly
- **URL:** https://www.metoffice.gov.uk/research/climate/maps-and-data/historic-station-data
- **Unique Value:** Continuous multi-parameter records
- **SYAN.EARTH Use:** UK coastal weather patterns

### 4. CEDA MIDAS

- **Organization:** Centre for Environmental Data Analysis
- **Date Range:** 1853-2024
- **Records:** 50M+
- **Parameters:** Comprehensive meteorological data
- **Resolution:** Hourly/Daily
- **URL:** https://catalogue.ceda.ac.uk/
- **Unique Value:** High-resolution UK coverage
- **SYAN.EARTH Use:** Detailed regional analysis

### 5. Met Éireann Historical Data

- **Organization:** Irish Meteorological Service
- **Date Range:** 1881-2024
- **Records:** 2M+
- **Parameters:** Temperature, rainfall, wind
- **Resolution:** Daily
- **URL:** https://www.met.ie/climate/available-data/historical-data
- **Unique Value:** Irish Sea / North Atlantic coverage
- **SYAN.EARTH Use:** Celtic Sea HAB correlation

### 6. Copernicus Marine Service

- **Organization:** European Union
- **Date Range:** 1993-2024
- **Records:** Satellite-derived
- **Parameters:** SST, chlorophyll, currents, waves
- **Resolution:** Daily / 0.25°
- **URL:** https://marine.copernicus.eu/
- **Unique Value:** Comprehensive ocean state data
- **SYAN.EARTH Use:** Ocean circulation, SST anomalies

### 7. Bio-Argo Network

- **Organization:** International Argo Program
- **Date Range:** 2012-2024
- **Records:** 300+ active floats
- **Parameters:** Chlorophyll, oxygen, nitrate, pH
- **Resolution:** 10-day profiles
- **URL:** https://biogeochemical-argo.org/
- **Unique Value:** Subsurface biological parameters
- **SYAN.EARTH Use:** Deep chlorophyll maximum, nutrient patterns

### 8. NOAA OISST (Optimum Interpolation SST)

- **Organization:** NOAA
- **Date Range:** 1981-2024
- **Records:** Global daily
- **Parameters:** Sea surface temperature
- **Resolution:** Daily / 0.25°
- **URL:** https://www.ncei.noaa.gov/products/optimum-interpolation-sst
- **Unique Value:** Consistent global SST baseline
- **SYAN.EARTH Use:** Temperature threshold monitoring

---

## Tampa Bay Regional Sources

### 1. FWC HAB Database

- **Organization:** Florida Fish & Wildlife Conservation Commission
- **Date Range:** 1953-2025
- **Records:** 200,000+
- **Parameters:** Karenia brevis cell counts, location, date
- **Resolution:** Event-based sampling
- **URL:** https://myfwc.com/research/redtide/
- **Coordinates:** 27.7617°N, -82.6867°W (central Tampa Bay)
- **Unique Value:** 70+ years of red tide records - longest HAB dataset in US
- **SYAN.EARTH Use:** Primary HAB training data, pattern recognition

### 2. Tampa Bay Estuary Program (TBEP)

- **Organization:** TBEP
- **Date Range:** 1972-2025
- **Records:** 26,000+
- **Parameters:** Water quality, nutrients, chlorophyll, DO
- **Resolution:** Monthly
- **URL:** https://tbep.org/
- **Coordinates:** 27.7676°N, -82.6343°W
- **Unique Value:** 50+ years of estuary health monitoring
- **SYAN.EARTH Use:** Nutrient loading, water quality trends

### 3. NOAA Buoy 42098 (Egmont Channel)

- **Organization:** NOAA NDBC
- **Date Range:** 2015-2025
- **Records:** Real-time
- **Parameters:** Wind, waves, temperature, currents
- **Resolution:** Hourly
- **URL:** https://www.ndbc.noaa.gov/station_page.php?station=42098
- **Coordinates:** 27.590°N, -82.931°W
- **Unique Value:** Gateway to Tampa Bay - first detection point
- **SYAN.EARTH Use:** Bloom transport prediction, upwelling detection

### 4. MacDill AFB Weather Station

- **Organization:** NOAA / US Air Force
- **Date Range:** 1941-2025
- **Records:** 30,000+
- **Parameters:** Temperature, wind, pressure, humidity
- **Resolution:** Hourly
- **URL:** ISD/NCEI archives
- **Coordinates:** 27.8494°N, -82.5214°W
- **Unique Value:** 80+ years of local weather, military-grade accuracy
- **SYAN.EARTH Use:** Wind patterns, respiratory irritation correlation

### 5. FWRI Old Tampa Bay Monitoring

- **Organization:** Fish & Wildlife Research Institute
- **Date Range:** 2011-2025
- **Records:** 5,000+
- **Parameters:** Pyrodinium bahamense, nutrients, salinity
- **Resolution:** Weekly
- **Coordinates:** 27.9264°N, -82.5917°W
- **Unique Value:** Pyrodinium-specific monitoring
- **SYAN.EARTH Use:** Secondary HAB species, bloom succession

### 6. USF Water Atlas

- **Organization:** University of South Florida
- **Date Range:** 1990-2025
- **Records:** Composite
- **Parameters:** Multi-agency water quality data
- **Resolution:** Varies
- **URL:** https://www.tampabay.wateratlas.usf.edu/
- **Coordinates:** 27.8006°N, -82.6673°W
- **Unique Value:** Aggregated multi-source data
- **SYAN.EARTH Use:** Comprehensive regional view

### 7. Pinellas County Red Tide Monitoring

- **Organization:** Pinellas County Environmental Management
- **Date Range:** 2000-2025
- **Records:** Weekly
- **Parameters:** K. brevis counts, beach conditions
- **Resolution:** Weekly
- **Coordinates:** 27.6233°N, -82.7394°W (Fort De Soto area)
- **Unique Value:** Beach-level monitoring, public health focus
- **SYAN.EARTH Use:** Respiratory impact correlation

### 8. Egmont Key C-MAN Station

- **Organization:** NOAA
- **Date Range:** 1990-2025
- **Records:** Continuous
- **Parameters:** Meteorological, water temperature
- **Resolution:** 6-minute
- **URL:** https://www.ndbc.noaa.gov/
- **Coordinates:** 27.6000°N, -82.7600°W
- **Unique Value:** Bay entrance conditions
- **SYAN.EARTH Use:** Tidal exchange, bloom entry detection

---

## Data Quality Notes

### Quality Assurance

All data sources undergo:
1. **Temporal validation** - Date range consistency checks
2. **Spatial validation** - Coordinate verification
3. **Value range checks** - Outlier detection
4. **Cross-source validation** - Inter-dataset consistency

### Known Limitations

- **Weather Rescue:** Digitization errors possible (~2% estimated)
- **FWC HAB:** Sampling bias toward reported bloom events
- **Bio-Argo:** Sparse coverage in coastal areas
- **Historical records:** Pre-1950 data less standardized

### Update Frequency

| Source Type | Update Frequency |
|-------------|------------------|
| Real-time buoys | Hourly |
| Satellite products | Daily |
| Field sampling | Weekly-Monthly |
| Historical archives | Annual additions |

---

## Adding New Data Sources

To propose a new data source, please:

1. Open a GitHub issue with the "Data Source" template
2. Include:
   - Source name and organization
   - URL and access method
   - Date range and parameters
   - Geographic coverage
   - Update frequency
   - Proposed use in SYAN.EARTH

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.

---

## References

1. Parker, D.E., et al. (1992). "A new daily Central England Temperature Series." Int. J. Climatol.
2. Weisberg, R.H., et al. (2019). "Coastal ocean circulation influence on the 2018 West Florida Shelf K. brevis red tide bloom." JGR Oceans.
3. Steidinger, K.A. (2009). "Historical perspective on Karenia brevis red tide research in the Gulf of Mexico." Harmful Algae.

---

*Last updated: January 2025*
