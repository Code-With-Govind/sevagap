# SevaGap — District Public Service Infrastructure & Equity Analytics

SevaGap is an empirical spatial analytics and regional disparity benchmarking platform developed for Maharashtra state. The initiative evaluates how public welfare services—specifically **School Education (UDISE+)**, **Public Healthcare Facilities**, and **Safe Drinking Water (Jal Jeevan Mission)**—are spatially distributed across administrative districts and talukas.

---

## 🏛️ System Architecture

```
React Frontend (Vite + Tailwind CSS + Leaflet)
       │
       ▼ (HTTP / JSON via Axios)
Express.js REST API Server (Node.js MVC on Port 5000)
       │
       ▼ (mysql2 Connection Pool)
MySQL Database (`sevagap_db` on Port 3306)
```

> **Resilient Development Architecture**: If MySQL is offline or undergoing configuration, the Express backend automatically operates in standalone mode, seamlessly serving development placeholder datasets without crashing.

---

## 📂 Project Directory Structure

```
sevagap/
├── public/                 # Static public assets
├── src/                    # Frontend source code (React 19 + Vite 8)
│   ├── assets/             # Images and SVG icons
│   ├── components/         # Reusable UI & visualization components
│   │   ├── charts/         # DistrictComparisonChart, ReusableBarChart, ReusablePieChart
│   │   ├── common/         # SummaryCard, PercentageIndicator, SectionHeader
│   │   ├── dashboard/      # HealthcareMap (Leaflet GIS), InteractiveMapPlaceholder
│   │   └── layout/         # Navbar (responsive hamburger), Footer, Layout shell
│   ├── data/               # Structured metadata and local fallback data
│   │   ├── aboutData.js    # 8 standardized About sections + official links
│   │   └── placeholderData.js # Sample district indicators
│   ├── pages/              # 6 interconnected views
│   │   ├── Home.jsx        # Overview statewide dashboard & KPI cards
│   │   ├── DistrictAnalysis.jsx # District disparity & composite index inspector
│   │   ├── Education.jsx   # UDISE+ school PTR, electrification & digital labs
│   │   ├── Healthcare.jsx  # PHC coverage, bed density & Leaflet GIS map
│   │   ├── DrinkingWater.jsx # JJM tap connection saturation & testing labs
│   │   └── About.jsx       # Complete documentation & official portal links
│   ├── services/
│   │   └── api.js          # Centralized Axios client with fallback
│   ├── App.jsx             # React Router v7 routes with code-splitting
│   ├── main.jsx            # React root mount
│   └── index.css           # Tailwind CSS v4 styling & Leaflet overrides
│
├── server/                 # Backend REST API Engine (Node.js + Express)
│   ├── config/
│   │   └── db.js           # MySQL connection pool with resilient fallback
│   ├── controllers/        # Request handlers with standardized JSON envelopes
│   │   ├── districtController.js
│   │   ├── educationController.js
│   │   ├── healthcareController.js
│   │   ├── waterController.js
│   │   └── analyticsController.js
│   ├── database/           # Database scripts & schema definitions
│   │   ├── schema.sql      # Tables: districts, education_data, healthcare_data, water_data
│   │   ├── seed.sql        # Sample records with data_status='PLACEHOLDER'
│   │   └── initDb.js       # Automated database migration runner
│   ├── middleware/         # errorHandler.js, validator.js
│   ├── models/             # Database queries & data aggregation
│   ├── routes/             # REST route definitions
│   ├── services/           # In-memory synchronized fallback store
│   ├── utils/              # responseHandler.js, standard response envelope
│   ├── .env.example        # Backend environment template
│   ├── app.js              # Express app setup (for testing & execution)
│   ├── server.js           # Server listen entrypoint (Port 5000)
│   └── testEndpoints.js    # Automated 15-endpoint verification test suite
│
├── .env.example            # Frontend environment template
├── vercel.json             # Vercel SPA routing rewrite rules
└── package.json            # Frontend scripts & dependencies
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24 tested)
- **MySQL**: MySQL 8.0 or XAMPP MySQL (optional during development due to automatic fallback mode)

---

### 2. Frontend Setup & Run
```powershell
# In the root repository directory:
npm install

# Start Vite development server:
npm run dev
```
The frontend will start at: `http://localhost:5173`

---

### 3. Backend Setup & Run
```powershell
# Navigate to or target the server directory:
npm install --prefix server

# Start the Express API server:
node server/server.js
# Or with auto-reload:
npm run dev --prefix server
```
The backend server will start at: `http://localhost:5000`

---

### 4. MySQL Database Setup (`sevagap_db`)
Configure your database password in `server/.env` if applicable:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=sevagap_db
```
Then run the automated database initialization script:
```powershell
node server/database/initDb.js
```
This automatically creates:
1. Database `sevagap_db`
2. Table `districts` (Primary key: `district_id`)
3. Table `education_data` (Foreign key: `district_id` $\rightarrow$ `districts`)
4. Table `healthcare_data` (Foreign key: `district_id` $\rightarrow$ `districts`)
5. Table `water_data` (Foreign key: `district_id` $\rightarrow$ `districts`)
6. Populates sample development records carrying `data_status = 'PLACEHOLDER'`.

---

## 📡 REST API Reference

All API responses follow a strict, standardized JSON contract:

```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": {},
  "meta": {
    "dataStatus": "PLACEHOLDER",
    "source": "Development sample data",
    "reportingYear": "2023-24",
    "timestamp": "2026-11-02T15:45:00.000Z"
  }
}
```

### Endpoints Table

| Category | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Health** | `GET` | `/api/health` | Service and database connectivity status |
| **Districts** | `GET` | `/api/districts` | Master list of monitored districts |
| **Districts** | `GET` | `/api/districts/:districtId` | Single district profile by ID (e.g. `pune`) |
| **Education** | `GET` | `/api/education` | All education indicators joined with districts |
| **Education** | `GET` | `/api/education/summary` | Statewide PTR, electrification & lab averages |
| **Education** | `GET` | `/api/education/:districtId` | District-specific education indicators |
| **Healthcare** | `GET` | `/api/healthcare` | All healthcare metrics joined with districts |
| **Healthcare** | `GET` | `/api/healthcare/facilities` | Facility pins with lat/lng for Leaflet GIS map |
| **Healthcare** | `GET` | `/api/healthcare/:districtId` | District-specific healthcare indicators |
| **Drinking Water** | `GET` | `/api/water` | All JJM tap connection metrics |
| **Drinking Water** | `GET` | `/api/water/summary` | Statewide tap saturation & lab totals |
| **Drinking Water** | `GET` | `/api/water/:districtId` | District-specific tap coverage indicators |
| **Dashboard** | `GET` | `/api/analytics/dashboard` | Statewide summary KPI cards for Home view |
| **Dashboard** | `GET` | `/api/analytics/district-comparison` | Multi-sector comparison dataset for Recharts |

### Testing Endpoints
To verify all 15 endpoints in-process, run:
```powershell
node server/testEndpoints.js
```

---

## 🔗 Official Data Sources & References

- **UDISE+ (Department of School Education & Literacy)**: [https://udiseplus.gov.in/](https://udiseplus.gov.in/)
- **Jal Jeevan Mission (Ministry of Jal Shakti)**: [https://ejalshakti.gov.in/jjmreport/](https://ejalshakti.gov.in/jjmreport/)
- **Open Government Data (OGD) Platform India**: [https://data.gov.in/](https://data.gov.in/)
- **Maharashtra Village Directory (MahaVillages)**: [https://mahavillages.mahabhumi.gov.in/](https://mahavillages.mahabhumi.gov.in/)
- **Healthcare Facility Repository**: State Public Health Department & NHP (location validation in progress).

---

## ⚠️ Important Disclaimer on Data

> **All development indicator values and calculations currently displayed on the frontend and served by the API are explicitly labeled as `DEMO DATA` / `data_status = 'PLACEHOLDER'`.** They serve to validate the software architecture and must never be cited or presented as actual Maharashtra findings until data collection, statistical normalization, and GIS verification are completed.
