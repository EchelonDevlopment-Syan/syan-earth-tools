# SYAN.EARTH API Documentation

> ⚠️ **Coming Soon** - The SYAN.EARTH API is currently in development. Join the waitlist at [syan.earth/api-waitlist](https://syan.earth/api-waitlist)

---

## Overview

The SYAN.EARTH API provides programmatic access to:
- HAB risk predictions
- Climate correlation analysis
- Historical data queries
- Real-time monitoring alerts

---

## Authentication

```bash
# All requests require an API key
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.syan.earth/v1/predictions
```

API keys are available through your dashboard at [dashboard.syan.earth](https://dashboard.syan.earth)

---

## Endpoints

### HAB Predictions

#### Get Current Risk Assessment

```http
GET /v1/predictions/current
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `region` | string | Yes | Region code (e.g., `tampa-bay`, `sw-florida`) |
| `species` | string | No | HAB species (default: `karenia_brevis`) |

**Response:**

```json
{
  "region": "tampa-bay",
  "timestamp": "2025-01-04T12:00:00Z",
  "risk_level": "elevated",
  "risk_score": 0.72,
  "confidence": 0.85,
  "factors": {
    "sst_anomaly": 1.2,
    "upwelling_index": 0.8,
    "wind_direction": "SW",
    "days_since_rain": 5
  },
  "forecast": {
    "24h": "elevated",
    "72h": "high",
    "7d": "moderate"
  },
  "recommendations": [
    "Monitor Egmont Channel for bloom transport",
    "Elevated respiratory risk expected at beaches"
  ]
}
```

#### Get Historical Predictions

```http
GET /v1/predictions/history
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `region` | string | Yes | Region code |
| `start_date` | string | Yes | ISO 8601 date |
| `end_date` | string | Yes | ISO 8601 date |
| `resolution` | string | No | `daily`, `weekly`, `monthly` |

---

### Climate Data

#### Query Climate Archive

```http
GET /v1/climate/query
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sources` | array | Yes | Data source IDs |
| `parameters` | array | Yes | Variables to retrieve |
| `start_date` | string | Yes | ISO 8601 date |
| `end_date` | string | Yes | ISO 8601 date |
| `location` | object | No | `{lat, lng, radius_km}` |

**Example Request:**

```bash
curl -X GET "https://api.syan.earth/v1/climate/query" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sources": ["noaa-sst", "fwc-hab"],
    "parameters": ["sst", "cell_count"],
    "start_date": "2024-01-01",
    "end_date": "2024-12-31",
    "location": {
      "lat": 27.76,
      "lng": -82.68,
      "radius_km": 50
    }
  }'
```

---

### Correlation Analysis

#### Run Correlation Analysis

```http
POST /v1/analysis/correlation
```

**Request Body:**

```json
{
  "sources": ["hadcet", "noaa-sst", "fwc-hab"],
  "analysis_type": "cross-domain",
  "time_period": {
    "start": "1980-01-01",
    "end": "2024-12-31"
  },
  "parameters": {
    "lag_days": [0, 7, 14, 30],
    "confidence_threshold": 0.95
  }
}
```

**Response:**

```json
{
  "analysis_id": "corr_abc123",
  "status": "completed",
  "results": {
    "correlations": [
      {
        "source_a": "noaa-sst",
        "source_b": "fwc-hab",
        "parameter_a": "sst_anomaly",
        "parameter_b": "cell_count",
        "lag_days": 14,
        "r_value": 0.67,
        "p_value": 0.001,
        "confidence": 0.99
      }
    ],
    "insights": [
      "SST anomalies >1.5°C correlate with HAB events 14 days later",
      "Strongest correlation in September-November"
    ]
  }
}
```

---

### Alerts

#### Subscribe to Alerts

```http
POST /v1/alerts/subscribe
```

**Request Body:**

```json
{
  "region": "tampa-bay",
  "thresholds": {
    "risk_level": "elevated",
    "cell_count": 10000
  },
  "channels": {
    "webhook": "https://your-app.com/webhook",
    "email": "alerts@yourcompany.com"
  }
}
```

#### Alert Webhook Payload

```json
{
  "event": "hab_alert",
  "timestamp": "2025-01-04T14:30:00Z",
  "region": "tampa-bay",
  "severity": "high",
  "data": {
    "risk_level": "high",
    "cell_count": 45000,
    "location": {
      "lat": 27.59,
      "lng": -82.93,
      "name": "Egmont Channel"
    }
  },
  "message": "Elevated K. brevis detected at Egmont Channel. Bloom transport to inner bay expected within 48-72 hours."
}
```

---

## Rate Limits

| Tier | Requests/Month | Requests/Minute | Price |
|------|----------------|-----------------|-------|
| Fisherman | 1,000 | 10 | $29/mo |
| Commercial | 10,000 | 60 | $299/mo |
| Enterprise | Unlimited | 300 | $2,999/mo |

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1704412800
```

---

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You have exceeded your monthly API quota",
    "details": {
      "limit": 1000,
      "used": 1000,
      "reset": "2025-02-01T00:00:00Z"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `INVALID_REQUEST` | 400 | Malformed request |
| `SERVER_ERROR` | 500 | Internal server error |

---

## SDKs & Libraries

### JavaScript/Node.js

```bash
npm install @syan-earth/api
```

```javascript
const SyanEarth = require('@syan-earth/api');

const client = new SyanEarth({ apiKey: 'YOUR_API_KEY' });

// Get current prediction
const prediction = await client.predictions.current({
  region: 'tampa-bay'
});

console.log(prediction.risk_level); // "elevated"
```

### Python

```bash
pip install syan-earth
```

```python
from syan_earth import SyanEarthClient

client = SyanEarthClient(api_key="YOUR_API_KEY")

# Get current prediction
prediction = client.predictions.current(region="tampa-bay")
print(prediction.risk_level)  # "elevated"
```

---

## Changelog

### v1.0.0 (Coming Soon)
- Initial API release
- HAB predictions endpoint
- Climate data queries
- Correlation analysis
- Alert subscriptions

---

## Support

- **Documentation:** https://docs.syan.earth
- **API Status:** https://status.syan.earth
- **Email:** api-support@syan.earth
- **GitHub Issues:** https://github.com/syan-earth/syan-earth-tools/issues

---

*Join the API waitlist at [syan.earth/api-waitlist](https://syan.earth/api-waitlist)*
