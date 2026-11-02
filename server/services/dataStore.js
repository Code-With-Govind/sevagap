// In-Memory Seed/Fallback Data Store
// Serves as the authoritative source of development placeholder records
// when MySQL is connecting or offline.

export const FALLBACK_DISTRICTS = [
  { district_id: 'pune', district_name: 'Pune', district_code: 'MH-PU', division: 'Pune', region_type: 'Urban/Semi-Urban', population: '9.4M' },
  { district_id: 'nagpur', district_name: 'Nagpur', district_code: 'MH-NG', division: 'Nagpur', region_type: 'Urban/Semi-Urban', population: '4.6M' },
  { district_id: 'nashik', district_name: 'Nashik', district_code: 'MH-NS', division: 'Nashik', region_type: 'Mixed', population: '6.1M' },
  { district_id: 'chhatrapati-sambhajinagar', district_name: 'Chhatrapati Sambhajinagar', district_code: 'MH-CS', division: 'Marathwada', region_type: 'Mixed', population: '3.7M' },
  { district_id: 'amravati', district_name: 'Amravati', district_code: 'MH-AM', division: 'Amravati', region_type: 'Rural/Agrarian', population: '2.9M' },
  { district_id: 'thane', district_name: 'Thane', district_code: 'MH-TH', division: 'Konkan', region_type: 'Urban', population: '8.1M' },
  { district_id: 'satara', district_name: 'Satara', district_code: 'MH-ST', division: 'Pune', region_type: 'Mixed', population: '3.0M' },
  { district_id: 'solapur', district_name: 'Solapur', district_code: 'MH-SO', division: 'Pune', region_type: 'Agrarian', population: '4.3M' },
  { district_id: 'nandurbar', district_name: 'Nandurbar', district_code: 'MH-ND', division: 'Nashik', region_type: 'Tribal/Hilly', population: '1.6M' },
  { district_id: 'gadchiroli', district_name: 'Gadchiroli', district_code: 'MH-GA', division: 'Nagpur', region_type: 'Tribal/Forest', population: '1.1M' },
  { district_id: 'yavatmal', district_name: 'Yavatmal', district_code: 'MH-YV', division: 'Amravati', region_type: 'Agrarian', population: '2.8M' },
  { district_id: 'ratnagiri', district_name: 'Ratnagiri', district_code: 'MH-RT', division: 'Konkan', region_type: 'Coastal/Hilly', population: '1.7M' },
];

export const FALLBACK_EDUCATION = [
  { district_id: 'pune', academic_year: '2023-24', ptr_ratio: 24.2, school_electrification_rate: 98.4, drinking_water_coverage: 99.2, digital_labs_rate: 79.5, secondary_dropout_rate: 7.8, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'nagpur', academic_year: '2023-24', ptr_ratio: 25.8, school_electrification_rate: 96.2, drinking_water_coverage: 98.1, digital_labs_rate: 72.0, secondary_dropout_rate: 9.4, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'nashik', academic_year: '2023-24', ptr_ratio: 27.0, school_electrification_rate: 93.5, drinking_water_coverage: 96.4, digital_labs_rate: 63.8, secondary_dropout_rate: 11.2, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'chhatrapati-sambhajinagar', academic_year: '2023-24', ptr_ratio: 28.5, school_electrification_rate: 92.1, drinking_water_coverage: 95.8, digital_labs_rate: 60.4, secondary_dropout_rate: 12.8, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'amravati', academic_year: '2023-24', ptr_ratio: 27.9, school_electrification_rate: 91.8, drinking_water_coverage: 95.0, digital_labs_rate: 58.2, secondary_dropout_rate: 13.5, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'thane', academic_year: '2023-24', ptr_ratio: 23.4, school_electrification_rate: 99.0, drinking_water_coverage: 99.4, digital_labs_rate: 82.1, secondary_dropout_rate: 8.2, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'satara', academic_year: '2023-24', ptr_ratio: 25.1, school_electrification_rate: 96.5, drinking_water_coverage: 98.0, digital_labs_rate: 71.3, secondary_dropout_rate: 9.0, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'solapur', academic_year: '2023-24', ptr_ratio: 28.1, school_electrification_rate: 91.4, drinking_water_coverage: 94.7, digital_labs_rate: 57.9, secondary_dropout_rate: 13.1, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'nandurbar', academic_year: '2023-24', ptr_ratio: 33.4, school_electrification_rate: 82.0, drinking_water_coverage: 89.5, digital_labs_rate: 41.2, secondary_dropout_rate: 18.6, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'gadchiroli', academic_year: '2023-24', ptr_ratio: 34.8, school_electrification_rate: 78.5, drinking_water_coverage: 87.2, digital_labs_rate: 38.6, secondary_dropout_rate: 21.4, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'yavatmal', academic_year: '2023-24', ptr_ratio: 30.2, school_electrification_rate: 88.0, drinking_water_coverage: 92.0, digital_labs_rate: 48.5, secondary_dropout_rate: 16.2, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
  { district_id: 'ratnagiri', academic_year: '2023-24', ptr_ratio: 24.6, school_electrification_rate: 95.8, drinking_water_coverage: 97.5, digital_labs_rate: 68.4, secondary_dropout_rate: 9.8, data_source: 'UDISE+', data_status: 'PLACEHOLDER' },
];

export const FALLBACK_HEALTHCARE = [
  { district_id: 'pune', reporting_year: '2023-24', phc_count: 98, beds_per_10k: 12.8, avg_distance_phc_km: 5.2, ambulance_coverage_rate: 95.2, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'nagpur', reporting_year: '2023-24', phc_count: 54, beds_per_10k: 10.4, avg_distance_phc_km: 6.8, ambulance_coverage_rate: 92.0, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'nashik', reporting_year: '2023-24', phc_count: 78, beds_per_10k: 8.2, avg_distance_phc_km: 8.4, ambulance_coverage_rate: 89.5, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'chhatrapati-sambhajinagar', reporting_year: '2023-24', phc_count: 58, beds_per_10k: 7.6, avg_distance_phc_km: 9.8, ambulance_coverage_rate: 87.2, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'amravati', reporting_year: '2023-24', phc_count: 49, beds_per_10k: 6.8, avg_distance_phc_km: 10.2, ambulance_coverage_rate: 86.0, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'thane', reporting_year: '2023-24', phc_count: 82, beds_per_10k: 13.2, avg_distance_phc_km: 4.8, ambulance_coverage_rate: 96.1, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'satara', reporting_year: '2023-24', phc_count: 68, beds_per_10k: 9.4, avg_distance_phc_km: 7.1, ambulance_coverage_rate: 91.0, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'solapur', reporting_year: '2023-24', phc_count: 74, beds_per_10k: 7.1, avg_distance_phc_km: 10.5, ambulance_coverage_rate: 85.4, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'nandurbar', reporting_year: '2023-24', phc_count: 38, beds_per_10k: 4.9, avg_distance_phc_km: 14.8, ambulance_coverage_rate: 78.2, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'gadchiroli', reporting_year: '2023-24', phc_count: 45, beds_per_10k: 4.2, avg_distance_phc_km: 17.5, ambulance_coverage_rate: 74.0, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'yavatmal', reporting_year: '2023-24', phc_count: 56, beds_per_10k: 5.8, avg_distance_phc_km: 12.1, ambulance_coverage_rate: 81.3, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
  { district_id: 'ratnagiri', reporting_year: '2023-24', phc_count: 62, beds_per_10k: 8.6, avg_distance_phc_km: 8.0, ambulance_coverage_rate: 88.9, data_source: 'Public Health Dept (Validation Pending)', data_status: 'PLACEHOLDER' },
];

export const FALLBACK_WATER = [
  { district_id: 'pune', reporting_year: '2023-24', fhtc_coverage_rate: 91.2, total_villages: 1850, har_ghar_jal_villages: 1420, testing_labs_count: 14, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'satara', reporting_year: '2023-24', fhtc_coverage_rate: 89.5, total_villages: 1720, har_ghar_jal_villages: 1280, testing_labs_count: 11, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'nagpur', reporting_year: '2023-24', fhtc_coverage_rate: 86.8, total_villages: 1610, har_ghar_jal_villages: 1140, testing_labs_count: 9, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'thane', reporting_year: '2023-24', fhtc_coverage_rate: 84.1, total_villages: 840, har_ghar_jal_villages: 590, testing_labs_count: 8, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'nashik', reporting_year: '2023-24', fhtc_coverage_rate: 78.4, total_villages: 1920, har_ghar_jal_villages: 1210, testing_labs_count: 12, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'ratnagiri', reporting_year: '2023-24', fhtc_coverage_rate: 76.9, total_villages: 1540, har_ghar_jal_villages: 980, testing_labs_count: 8, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'chhatrapati-sambhajinagar', reporting_year: '2023-24', fhtc_coverage_rate: 73.2, total_villages: 1340, har_ghar_jal_villages: 780, testing_labs_count: 9, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'amravati', reporting_year: '2023-24', fhtc_coverage_rate: 71.0, total_villages: 1650, har_ghar_jal_villages: 890, testing_labs_count: 8, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'solapur', reporting_year: '2023-24', fhtc_coverage_rate: 68.5, total_villages: 1140, har_ghar_jal_villages: 620, testing_labs_count: 10, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'yavatmal', reporting_year: '2023-24', fhtc_coverage_rate: 63.8, total_villages: 1820, har_ghar_jal_villages: 890, testing_labs_count: 7, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'nandurbar', reporting_year: '2023-24', fhtc_coverage_rate: 59.4, total_villages: 940, har_ghar_jal_villages: 420, testing_labs_count: 5, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
  { district_id: 'gadchiroli', reporting_year: '2023-24', fhtc_coverage_rate: 54.1, total_villages: 1510, har_ghar_jal_villages: 560, testing_labs_count: 6, data_source: 'Jal Jeevan Mission', data_status: 'PLACEHOLDER' },
];

export const FALLBACK_HEALTHCARE_FACILITIES = [
  { id: 1, name: 'District Civil Hospital, Pune', district_id: 'pune', type: 'District Hospital', beds: 650, lat: 18.5204, lng: 73.8567, status: 'Verified' },
  { id: 2, name: 'General Hospital, Nagpur', district_id: 'nagpur', type: 'District Hospital', beds: 480, lat: 21.1458, lng: 79.0882, status: 'Verified' },
  { id: 3, name: 'Civil Hospital, Nashik', district_id: 'nashik', type: 'District Hospital', beds: 400, lat: 19.9975, lng: 73.7898, status: 'Verified' },
  { id: 4, name: 'Sub-District Hospital, Nandurbar', district_id: 'nandurbar', type: 'Sub-District Hospital', beds: 100, lat: 21.3739, lng: 74.2403, status: 'Validating GIS' },
  { id: 5, name: 'Rural Hospital, Aheri', district_id: 'gadchiroli', type: 'Rural Hospital', beds: 50, lat: 19.4147, lng: 80.0033, status: 'Validating GIS' },
  { id: 6, name: 'Govt Medical College Hospital, Chh. Sambhajinagar', district_id: 'chhatrapati-sambhajinagar', type: 'Tertiary', beds: 750, lat: 19.8762, lng: 75.3433, status: 'Verified' },
  { id: 7, name: 'Sub-District Hospital, Karad', district_id: 'satara', type: 'Sub-District Hospital', beds: 120, lat: 17.2885, lng: 74.1844, status: 'Verified' },
  { id: 8, name: 'Civil Hospital, Solapur', district_id: 'solapur', type: 'District Hospital', beds: 350, lat: 17.6599, lng: 75.9064, status: 'Verified' },
];

