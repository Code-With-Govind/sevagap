// SevaGap About Page Structured Content & Official References

export const ABOUT_SECTIONS = {
  projectOverview: {
    title: 'Project Overview',
    subtitle: 'Data-driven spatial analytics for equitable public service infrastructure delivery.',
    summary:
      'SevaGap is an empirical spatial analytics and regional disparity benchmarking platform developed for Maharashtra state. The initiative systematically evaluates how public welfare services—principally school education, healthcare delivery facilities, and safe rural drinking water—are spatially distributed across administrative districts and talukas. By identifying underserved pockets, physical isolation barriers, and structural gaps, SevaGap bridges the divide between policy allocation and grassroots accessibility.',
    highlights: [
      { label: '3 Critical Sectors', detail: 'School Education (UDISE+), Healthcare Facilities, Drinking Water (JJM)' },
      { label: '36 Districts', detail: 'Comprehensive comparative analysis across Konkan, Pune, Nashik, Marathwada, and Vidarbha' },
      { label: 'Spatial Equity Focus', detail: 'Assessing spatial accessibility, population burden, and tribal/agrarian regional disparities' },
    ],
  },

  problemStatement: {
    title: 'Problem Statement',
    subtitle: 'Persistent regional imbalances and spatial blind spots in public infrastructure provision.',
    content: [
      'While Maharashtra is one of India\'s largest state economies, socio-economic progress and public infrastructure access remain unevenly distributed. High-density urban corridors (such as Mumbai, Pune, and Thane) exhibit advanced tertiary services, whereas remote, tribal, and drought-prone agrarian regions (such as Nandurbar, Gadchiroli, Yavatmal, and Marathwada) encounter systemic challenges.',
      'Key pain points addressed by SevaGap include:',
    ],
    points: [
      {
        title: 'Geographic and Physical Isolation',
        description: 'Tribal talukas and hilly terrains suffer from extended transit times to access Primary Health Centres (PHCs) and secondary schools, causing elevated dropout and maternal risk rates.',
      },
      {
        title: 'Siloed Government Datasets',
        description: 'Information regarding schools (UDISE+), water supply (Jal Jeevan Mission), and health centres (Public Health Dept) resides in independent institutional silos without an integrated spatial dashboard.',
      },
      {
        title: 'Nominal vs. Effective Access Gap',
        description: 'A facility may exist on administrative records but lack functional infrastructure (e.g., electricity, digital labs, specialized doctors, or round-the-clock potable tap water).',
      },
      {
        title: 'Evidence-Deficit Resource Allocation',
        description: 'Public welfare spending frequently follows historical budgeting rather than real-time spatial vulnerability indicators and demographic density burdens.',
      },
    ],
  },

  projectObjectives: {
    title: 'Project Objectives',
    subtitle: 'Actionable goals driving the SevaGap decision-support framework.',
    objectives: [
      {
        number: '01',
        title: 'Multi-Sectoral Disparity Index',
        description: 'Formulate an empirical, transparent Composite Gap Index (CGI) evaluating infrastructure readiness across Maharashtra\'s districts.',
      },
      {
        number: '02',
        title: 'GIS Spatial Accessibility Modeling',
        description: 'Map facility footprints using geographic coordinates to compute actual population travel distances, service catchments, and unserved cluster zones.',
      },
      {
        number: '03',
        title: 'Cross-District Comparative Benchmarking',
        description: 'Benchmark district performance against state norms and national standards (RTE norms, IPHS benchmarks, Har Ghar Jal guidelines).',
      },
      {
        number: '04',
        title: 'Actionable Policy Decision Support',
        description: 'Provide state planners, district collectors, research scholars, and civil society with clear visual intelligence to prioritize budget and infrastructure deployment.',
      },
    ],
  },

  projectScope: {
    title: 'Project Scope',
    subtitle: 'Parameters, thematic boundaries, and geographical coverage.',
    scopeItems: [
      {
        category: 'Geographical Domain',
        details: 'The state of Maharashtra, encompassing 36 districts across 6 administrative divisions (Konkan, Pune, Nashik, Chhatrapati Sambhajinagar/Marathwada, Amravati, and Nagpur).',
      },
      {
        category: 'Sector 1: School Education',
        details: 'Elementary and secondary education infrastructure, Pupil-Teacher Ratios (PTR), gender-segregated sanitation, digital literacy labs, electrification, and dropout trends.',
      },
      {
        category: 'Sector 2: Public Healthcare',
        details: 'Hierarchical network of Sub-Centres, Primary Health Centres (PHCs), Community Health Centres (CHCs), Sub-District Hospitals (SDHs), bed density, and emergency transit access.',
      },
      {
        category: 'Sector 3: Rural Drinking Water',
        details: 'Household tap connection (FHTC) penetration under Jal Jeevan Mission, village coverage consistency, water testing laboratory verification, and source sustainability.',
      },
    ],
  },

  methodology: {
    title: 'Methodology & Analytical Pipeline',
    subtitle: 'Rigorous multi-stage data curation, statistical normalization, and GIS processing.',
    steps: [
      {
        step: 'Step 1',
        name: 'Data Ingestion & Sourcing',
        detail: 'Harvesting administrative indicators from verified national portals (UDISE+, JJM, OGD, Mahavillages) via open APIs, standardized CSVs, and gazetteers.',
      },
      {
        step: 'Step 2',
        name: 'Cleaning & Anomaly Detection',
        detail: 'Handling missing administrative records, normalizing taluka/district nomenclature changes, and validating numeric bounds against statistical thresholds.',
      },
      {
        step: 'Step 3',
        name: 'Geocoding & Spatial Validation',
        detail: 'Assigning and verifying latitude/longitude coordinates for healthcare facilities, administrative headquarters, and service catchments.',
      },
      {
        step: 'Step 4',
        name: 'Statistical Normalization',
        detail: 'Applying Min-Max and Z-score transformations to harmonize diverse metrics (e.g. percentages, ratios, distances) onto a standardized 0–100 scale.',
      },
      {
        step: 'Step 5',
        name: 'Composite Index Calculation',
        detail: 'Computing weighted thematic gap scores and spatial disparity coefficients across each sector and district.',
      },
      {
        step: 'Step 6',
        name: 'Interactive Frontend Synthesis',
        detail: 'Presenting high-performance visual dashboards, responsive comparative charts, interactive map layers, and exportable reports.',
      },
    ],
  },

  dataSources: {
    title: 'Data Sources & Official References',
    subtitle: 'Authentic government datasets and institutional repositories powering SevaGap.',
    sources: [
      {
        name: 'UDISE+ (Unified District Information System for Education Plus)',
        department: 'Department of School Education & Literacy, Ministry of Education, Govt. of India',
        url: 'https://udiseplus.gov.in/',
        description: 'Comprehensive state and district school statistics covering infrastructure amenities, student enrolment, PTR ratios, and teacher demographics.',
        badge: 'Education',
        type: 'Official Portal',
      },
      {
        name: 'Jal Jeevan Mission (JJM Integrated Management Information System)',
        department: 'Department of Drinking Water and Sanitation, Ministry of Jal Shakti, Govt. of India',
        url: 'https://ejalshakti.gov.in/jjmreport/',
        description: 'Real-time dashboard reporting Functional Household Tap Connections (FHTC), village certification status, and water quality testing laboratories.',
        badge: 'Drinking Water',
        type: 'Real-time Portal',
      },
      {
        name: 'Open Government Data (OGD) Platform India',
        department: 'National Informatics Centre (NIC), Ministry of Electronics & IT, Govt. of India',
        url: 'https://data.gov.in/',
        description: 'National repository for open datasets, census indicators, administrative boundaries, and demographic datasets.',
        badge: 'Demographics & Census',
        type: 'Data Repository',
      },
      {
        name: 'Maharashtra Village Directory (MahaVillages)',
        department: 'Revenue & Forest Department, Government of Maharashtra',
        url: 'https://mahavillages.mahabhumi.gov.in/',
        description: 'Authoritative state land record and village directory providing standardized census codes, taluka hierarchies, and local governance entities.',
        badge: 'Administrative Boundary',
        type: 'State Directory',
      },
      {
        name: 'Public Healthcare Facility Repository',
        department: 'Public Health Department, Govt. of Maharashtra & National Health Portal (NHP)',
        url: '#',
        description: 'Facility listings, bed allotments, and PHC/CHC network geo-coordinates (location dataset curation and GIS validation currently in progress).',
        badge: 'Healthcare (Validation in Progress)',
        type: 'State Public Health Portal',
        inProgress: true,
      },
    ],
  },

  technologyStack: {
    title: 'Technology Stack',
    subtitle: 'Modern, scalable frontend and spatial analytical architecture.',
    categories: [
      {
        name: 'Frontend & UI Framework',
        techs: [
          { name: 'React 19', role: 'Component-driven, high-performance UI library' },
          { name: 'Vite 8', role: 'Next-generation rapid build tool and dev server' },
          { name: 'Tailwind CSS v4', role: 'Utility-first modern responsive styling engine' },
          { name: 'React Router v7', role: 'Client-side routing and page management' },
          { name: 'Lucide React', role: 'Accessible, consistent SVG icon system' },
        ],
      },
      {
        name: 'Visualisation & Mapping',
        techs: [
          { name: 'Recharts', role: 'Composable SVG chart library with responsive containers' },
          { name: 'Leaflet / React-Leaflet', role: 'Interactive geospatial map overlays for facility visualization' },
          { name: 'GeoJSON Engine', role: 'District boundary polygon rendering and spatial overlays' },
        ],
      },
      {
        name: 'API & Data Layer',
        techs: [
          { name: 'Axios', role: 'Promise-based HTTP client with interceptors and robust fallback mechanism' },
          { name: 'RESTful API Services', role: 'Decoupled API endpoints for district indicators and sector KPIs' },
        ],
      },
      {
        name: 'Data Science & Backend Pipeline (In Progress)',
        techs: [
          { name: 'Python & Pandas', role: 'Tabular data cleansing, normalization, and outlier detection' },
          { name: 'GeoPandas & Shapely', role: 'Spatial joins, distance buffer computations, and GIS validation' },
          { name: 'FastAPI / Python Service', role: 'High-speed asynchronous backend serving aggregated metrics' },
        ],
      },
    ],
  },

  limitationsAndFutureScope: {
    title: 'Limitations & Future Scope',
    subtitle: 'Transparent methodological caveats and envisioned development roadmap.',
    limitations: [
      'Temporal Lags in Official Reporting: Datasets like UDISE+ and Census reflect periodic publishing cycles, which may lag immediate on-ground infrastructure inaugurations.',
      'Facility Geolocation Granularity: Certain remote sub-centres and rural clinics have centroid or village-level coordinates rather than high-precision surveyed GPS points.',
      'Qualitative Service Experience: Quantitative metrics (e.g. bed counts or tap presence) do not directly capture qualitative operational hours, doctor attendance, or water potability seasonality.',
    ],
    futureScope: [
      'Multi-modal Road Network Routing: Integrating OpenStreetMap (OSM) routing engine to compute actual road travel times (isochrones) instead of Euclidean distances.',
      'Crowdsourced Citizen Feedback: Implementing verified community reporting channels to validate tap water supply frequency and school amenity maintenance.',
      'Predictive Infrastructure Forecasting: Machine learning models predicting high-risk teacher shortages and water deficit talukas based on seasonal monsoon variations.',
      'Granular Gram Panchayat & Ward Level Drilling: Expanding from district-level aggregations down to taluka, gram panchayat, and urban ward boundaries.',
    ],
  },
};

