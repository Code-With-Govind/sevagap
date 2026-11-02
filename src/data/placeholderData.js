// SevaGap Placeholder Datasets for Frontend Development
// Note: These values are illustrative placeholders representing Maharashtra public infrastructure
// until the verified GIS and statistical datasets are integrated from official sources.

export const MAHARASHTRA_DISTRICTS = [
  { id: 'pune', name: 'Pune', division: 'Pune', type: 'Urban/Semi-Urban', population: '9.4M', compositeScore: 84.5 },
  { id: 'nagpur', name: 'Nagpur', division: 'Nagpur', type: 'Urban/Semi-Urban', population: '4.6M', compositeScore: 78.2 },
  { id: 'nashik', name: 'Nashik', division: 'Nashik', type: 'Mixed', population: '6.1M', compositeScore: 74.8 },
  { id: 'chhatrapati-sambhajinagar', name: 'Chhatrapati Sambhajinagar', division: 'Marathwada', type: 'Mixed', population: '3.7M', compositeScore: 71.0 },
  { id: 'amravati', name: 'Amravati', division: 'Amravati', type: 'Rural/Agrarian', population: '2.9M', compositeScore: 66.4 },
  { id: 'thane', name: 'Thane', division: 'Konkan', type: 'Urban', population: '8.1M', compositeScore: 81.3 },
  { id: 'satara', name: 'Satara', division: 'Pune', type: 'Mixed', population: '3.0M', compositeScore: 76.5 },
  { id: 'solapur', name: 'Solapur', division: 'Pune', type: 'Agrarian', population: '4.3M', compositeScore: 69.1 },
  { id: 'nandurbar', name: 'Nandurbar', division: 'Nashik', type: 'Tribal/Hilly', population: '1.6M', compositeScore: 52.4 },
  { id: 'gadchiroli', name: 'Gadchiroli', division: 'Nagpur', type: 'Tribal/Forest', population: '1.1M', compositeScore: 49.8 },
  { id: 'yavatmal', name: 'Yavatmal', division: 'Amravati', type: 'Agrarian', population: '2.8M', compositeScore: 58.7 },
  { id: 'ratnagiri', name: 'Ratnagiri', division: 'Konkan', type: 'Coastal/Hilly', population: '1.7M', compositeScore: 72.3 },
];

export const OVERVIEW_KPI_STATS = [
  {
    id: 'fhtc-coverage',
    title: 'Drinking Water Tap Connections',
    value: '79.4%',
    change: '+8.2% YoY',
    trend: 'up',
    benchmark: 'National Target: 100%',
    sector: 'water',
    description: 'Functional Household Tap Connections (FHTC) across rural Maharashtra villages.',
  },
  {
    id: 'ptr-ratio',
    title: 'Pupil-Teacher Ratio (PTR)',
    value: '26.4 : 1',
    change: 'Norm: ≤ 30:1',
    trend: 'neutral',
    benchmark: 'RTE Benchmark: 30:1',
    sector: 'education',
    description: 'State average pupil-to-teacher ratio across government and aided elementary schools.',
  },
  {
    id: 'phc-reach',
    title: 'PHC Coverage Radius',
    value: '8.6 km',
    change: '-1.4 km improved',
    trend: 'up',
    benchmark: 'Target: < 5.0 km',
    sector: 'healthcare',
    description: 'Average travel distance to the nearest primary health centre in rural talukas.',
  },
  {
    id: 'composite-gap',
    title: 'State Composite Service Index',
    value: '71.2 / 100',
    change: '+3.8 pts',
    trend: 'up',
    benchmark: 'Baseline: 60.0',
    sector: 'all',
    description: 'Weighted composite metric evaluating infrastructure accessibility parity.',
  },
];

export const DISTRICT_COMPARISON_DATA = [
  { district: 'Pune', education: 88, healthcare: 86, water: 82, composite: 85.3 },
  { district: 'Thane', education: 85, healthcare: 82, water: 81, composite: 82.6 },
  { district: 'Nagpur', education: 82, healthcare: 79, water: 76, composite: 79.0 },
  { district: 'Satara', education: 81, healthcare: 74, water: 77, composite: 77.3 },
  { district: 'Nashik', education: 79, healthcare: 73, water: 74, composite: 75.3 },
  { district: 'Chh. Sambhajinagar', education: 74, healthcare: 70, water: 71, composite: 71.6 },
  { district: 'Solapur', education: 73, healthcare: 67, water: 68, composite: 69.3 },
  { district: 'Amravati', education: 71, healthcare: 65, water: 66, composite: 67.3 },
  { district: 'Yavatmal', education: 64, healthcare: 57, water: 59, composite: 60.0 },
  { district: 'Nandurbar', education: 56, healthcare: 51, water: 53, composite: 53.3 },
  { district: 'Gadchiroli', education: 52, healthcare: 48, water: 50, composite: 50.0 },
];

export const EDUCATION_SECTOR_DATA = {
  kpis: [
    { title: 'School Electrification', value: '94.2%', target: '100%', change: '+3.1%', status: 'good' },
    { title: 'Functional Drinking Water in Schools', value: '97.8%', target: '100%', change: '+1.4%', status: 'good' },
    { title: 'Computer / ICT Lab Availability', value: '64.5%', target: '85%', change: '+9.2%', status: 'warning' },
    { title: 'Secondary Dropout Rate (Avg)', value: '11.8%', target: '< 5%', change: '-2.1%', status: 'caution' },
  ],
  ptrByDivision: [
    { name: 'Konkan', ptr: 23.2, digitalLabs: 78, girlToilets: 99.1 },
    { name: 'Pune', ptr: 24.8, digitalLabs: 74, girlToilets: 98.4 },
    { name: 'Nashik', ptr: 27.1, digitalLabs: 61, girlToilets: 96.2 },
    { name: 'Chh. Sambhajinagar', ptr: 28.9, digitalLabs: 58, girlToilets: 95.0 },
    { name: 'Amravati', ptr: 27.8, digitalLabs: 56, girlToilets: 94.7 },
    { name: 'Nagpur', ptr: 26.5, digitalLabs: 63, girlToilets: 96.8 },
  ],
  schoolTypesDistribution: [
    { name: 'Government / ZP', value: 58, color: '#3b82f6' },
    { name: 'Government-Aided', value: 24, color: '#10b981' },
    { name: 'Private Unaided', value: 15, color: '#f59e0b' },
    { name: 'Others / Tribal Ashram', value: 3, color: '#8b5cf6' },
  ],
  infrastructureReadiness: [
    { facility: 'Functional Boys Toilets', coverage: 96 },
    { facility: 'Functional Girls Toilets', coverage: 97.5 },
    { facility: 'Handwashing Facility', coverage: 93 },
    { facility: 'Electricity Connection', coverage: 94.2 },
    { facility: 'Library / Reading Corner', coverage: 82.4 },
    { facility: 'ICT / Computer Labs', coverage: 64.5 },
    { facility: 'Ramp for Divyang Access', coverage: 78.1 },
    { facility: 'Playground Facility', coverage: 86.3 },
  ]
};

export const HEALTHCARE_SECTOR_DATA = {
  kpis: [
    { title: 'Primary Health Centres (PHC)', value: '1,828', target: 'Mapped', change: 'State total', status: 'neutral' },
    { title: 'Avg Population per PHC', value: '34,200', target: '30,000 norm', change: '+14% burden', status: 'caution' },
    { title: 'Govt Hospital Beds / 10k Pop', value: '7.8', target: '20 norm', change: 'Gap: 12.2 beds', status: 'warning' },
    { title: 'Dial 108 Ambulance Coverage', value: '91.4%', target: '100%', change: 'Response: 22m', status: 'good' },
  ],
  bedAvailabilityByDivision: [
    { name: 'Konkan', bedsPer10k: 12.4, phcShortage: 8, avgDistanceKm: 4.8 },
    { name: 'Pune', bedsPer10k: 10.2, phcShortage: 12, avgDistanceKm: 6.2 },
    { name: 'Nagpur', bedsPer10k: 8.8, phcShortage: 16, avgDistanceKm: 7.9 },
    { name: 'Nashik', bedsPer10k: 7.1, phcShortage: 22, avgDistanceKm: 9.4 },
    { name: 'Amravati', bedsPer10k: 6.4, phcShortage: 25, avgDistanceKm: 10.1 },
    { name: 'Chh. Sambhajinagar', bedsPer10k: 5.9, phcShortage: 29, avgDistanceKm: 11.5 },
  ],
  facilityTypesDistribution: [
    { name: 'Sub-Centres', value: 10638, color: '#0284c7' },
    { name: 'Primary Health Centres (PHC)', value: 1828, color: '#0d9488' },
    { name: 'Community Health Centres (CHC)', value: 382, color: '#eab308' },
    { name: 'Sub-District Hospitals (SDH)', value: 89, color: '#f97316' },
    { name: 'District Hospitals (DH)', value: 34, color: '#ef4444' },
  ],
  hospitalLocationsPlaceholder: [
    { id: 1, name: 'District Civil Hospital, Pune', district: 'Pune', type: 'District Hospital', beds: 650, lat: 18.5204, lng: 73.8567, status: 'Verified' },
    { id: 2, name: 'General Hospital, Nagpur', district: 'Nagpur', type: 'District Hospital', beds: 480, lat: 21.1458, lng: 79.0882, status: 'Verified' },
    { id: 3, name: 'Civil Hospital, Nashik', district: 'Nashik', type: 'District Hospital', beds: 400, lat: 19.9975, lng: 73.7898, status: 'Verified' },
    { id: 4, name: 'Sub-District Hospital, Nandurbar', district: 'Nandurbar', type: 'Sub-District Hospital', beds: 100, lat: 21.3739, lng: 74.2403, status: 'Validating GIS' },
    { id: 5, name: 'Rural Hospital, Aheri (Gadchiroli)', district: 'Gadchiroli', type: 'Rural Hospital', beds: 50, lat: 19.4147, lng: 80.0033, status: 'Validating GIS' },
    { id: 6, name: 'Government Medical College Hospital, Chh. Sambhajinagar', district: 'Chh. Sambhajinagar', type: 'Tertiary', beds: 750, lat: 19.8762, lng: 75.3433, status: 'Verified' },
    { id: 7, name: 'Sub-District Hospital, Karad', district: 'Satara', type: 'Sub-District Hospital', beds: 120, lat: 17.2885, lng: 74.1844, status: 'Verified' },
    { id: 8, name: 'Civil Hospital, Solapur', district: 'Solapur', type: 'District Hospital', beds: 350, lat: 17.6599, lng: 75.9064, status: 'Verified' },
  ]
};

export const WATER_SECTOR_DATA = {
  kpis: [
    { title: 'Total FHTC Coverage', value: '79.4%', target: '100% Target', change: '+14.2% since 2023', status: 'good' },
    { title: '100% "Har Ghar Jal" Villages', value: '18,420', target: '40,000+ villages', change: '46.1% achieved', status: 'neutral' },
    { title: 'Water Quality Testing Laboratories', value: '178', target: 'Statewide network', change: 'FTK kits active', status: 'good' },
    { title: 'Contaminated Sources Remediated', value: '92.6%', target: '100%', change: '+5.4% YoY', status: 'good' },
  ],
  districtProgress: [
    { district: 'Pune', progress: 91.2, target: 100 },
    { district: 'Satara', progress: 89.5, target: 100 },
    { district: 'Nagpur', progress: 86.8, target: 100 },
    { district: 'Thane', progress: 84.1, target: 100 },
    { district: 'Nashik', progress: 78.4, target: 100 },
    { district: 'Ratnagiri', progress: 76.9, target: 100 },
    { district: 'Chh. Sambhajinagar', progress: 73.2, target: 100 },
    { district: 'Amravati', progress: 71.0, target: 100 },
    { district: 'Solapur', progress: 68.5, target: 100 },
    { district: 'Yavatmal', progress: 63.8, target: 100 },
    { district: 'Nandurbar', progress: 59.4, target: 100 },
    { district: 'Gadchiroli', progress: 54.1, target: 100 },
  ],
  waterSupplySourceBreakdown: [
    { name: 'Multi-Village Piped Scheme', value: 48, color: '#0ea5e9' },
    { name: 'Single-Village Groundwater Borewell', value: 34, color: '#06b6d4' },
    { name: 'Surface Water / River Lift', value: 13, color: '#38bdf8' },
    { name: 'Traditional / Dugwell Source', value: 5, color: '#93c5fd' },
  ]
};
