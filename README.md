# SevaGap - Public Service Infrastructure & Equity Analytics (Maharashtra)

SevaGap is an empirical spatial analytics and regional disparity benchmarking platform developed for Maharashtra state. The initiative evaluates how public welfare services—specifically **School Education**, **Healthcare Facilities**, and **Safe Drinking Water**—are spatially distributed across administrative districts and talukas.

---

## 📌 Architecture & Modules

The platform is organized into six interconnected views powered by React 19, React Router v7, Vite, and Tailwind CSS:

1. **Home / Overview Dashboard (`/`)**:
   - Statewide KPI summary cards across all 3 key sectors + Composite Service Index.
   - Cross-sector district parity comparative charts (Recharts).
   - District quick search, regional classification filters, and sector navigation shortcuts.

2. **District Analysis (`/district-analysis`)**:
   - District selector & interactive inspection card.
   - Composite Gap Score breakdown across Education, Healthcare, and Drinking Water.
   - Comparative district ranking bar charts and tabular disparity breakdown.

3. **Education Analytics (`/education`)**:
   - UDISE+ school indicators: Pupil-Teacher Ratio (PTR), school electrification, drinking water, and digital labs.
   - Administrative division comparisons and school management distribution (ZP, Aided, Private Unaided).
   - Foundational school amenities coverage indicators.

4. **Healthcare & GIS Mapping (`/healthcare`)**:
   - Primary Health Centre (PHC) coverage, population burden, and hospital bed availability per 10,000 population.
   - **Interactive GIS Map Viewer**: Dedicated layer for secondary/tertiary hospital locations, catchment buffers, and geocoded pins (ready for validated GIS dataset integration).

5. **Drinking Water - JJM (`/drinking-water`)**:
   - Jal Jeevan Mission Functional Household Tap Connections (FHTC %).
   - "Har Ghar Jal" village saturation status and water quality testing laboratories.
   - District-wise tap connection progress charts and water supply scheme typologies.

6. **About & Methodology (`/about`)**:
   - Comprehensive project documentation containing all 8 standardized sections:
     1. Project Overview
     2. Problem Statement
     3. Project Objectives
     4. Project Scope
     5. Methodology & Analytical Pipeline
     6. Data Sources & Official References (UDISE+, Jal Jeevan Mission, Open Government Data, MahaVillages, Healthcare note)
     7. Technology Stack
     8. Limitations & Future Scope

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd sevagap

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```

### Building for Production
```bash
# Generate optimized production build
npm run build

# Run linter
npm run lint
```

---

## 🔗 Official Data Sources & References

- **UDISE+ (Department of School Education & Literacy)**: [https://udiseplus.gov.in/](https://udiseplus.gov.in/)
- **Jal Jeevan Mission (Ministry of Jal Shakti)**: [https://ejalshakti.gov.in/jjmreport/](https://ejalshakti.gov.in/jjmreport/)
- **Open Government Data (OGD) Platform India**: [https://data.gov.in/](https://data.gov.in/)
- **Maharashtra Village Directory (MahaVillages)**: [https://mahavillages.mahabhumi.gov.in/](https://mahavillages.mahabhumi.gov.in/)
- **Healthcare Facility Repository**: State Public Health Department & NHP (location validation in progress).

---

## 🔌 API Integration & Service Architecture

The frontend integrates with backend REST services via Axios (`src/services/api.js`):
- Configurable `VITE_API_BASE_URL` (defaults to `http://127.0.0.1:8000/api`).
- Seamless fallback to `src/data/placeholderData.js` during dataset curation and backend staging.
