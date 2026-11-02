-- ========================================================
-- SevaGap Seed Data (Development Placeholder Data)
-- Notice: ALL records are clearly marked as PLACEHOLDER
-- These records simulate the database state until verified
-- datasets from UDISE+, JJM, and Health Dept are ingested.
-- ========================================================

USE sevagap_db;

-- Clear previous placeholder records safely
DELETE FROM water_data WHERE data_status = 'PLACEHOLDER';
DELETE FROM healthcare_data WHERE data_status = 'PLACEHOLDER';
DELETE FROM education_data WHERE data_status = 'PLACEHOLDER';
DELETE FROM districts WHERE district_id IN (
  'pune', 'nagpur', 'nashik', 'chhatrapati-sambhajinagar', 'amravati',
  'thane', 'satara', 'solapur', 'nandurbar', 'gadchiroli', 'yavatmal', 'ratnagiri'
);

-- 1. Insert Initial Monitored Districts
INSERT INTO districts (district_id, district_name, district_code, division, region_type, population)
VALUES
  ('pune', 'Pune', 'MH-PU', 'Pune', 'Urban/Semi-Urban', '9.4M'),
  ('nagpur', 'Nagpur', 'MH-NG', 'Nagpur', 'Urban/Semi-Urban', '4.6M'),
  ('nashik', 'Nashik', 'MH-NS', 'Nashik', 'Mixed', '6.1M'),
  ('chhatrapati-sambhajinagar', 'Chhatrapati Sambhajinagar', 'MH-CS', 'Marathwada', 'Mixed', '3.7M'),
  ('amravati', 'Amravati', 'MH-AM', 'Amravati', 'Rural/Agrarian', '2.9M'),
  ('thane', 'Thane', 'MH-TH', 'Konkan', 'Urban', '8.1M'),
  ('satara', 'Satara', 'MH-ST', 'Pune', 'Mixed', '3.0M'),
  ('solapur', 'Solapur', 'MH-SO', 'Pune', 'Agrarian', '4.3M'),
  ('nandurbar', 'Nandurbar', 'MH-ND', 'Nashik', 'Tribal/Hilly', '1.6M'),
  ('gadchiroli', 'Gadchiroli', 'MH-GA', 'Nagpur', 'Tribal/Forest', '1.1M'),
  ('yavatmal', 'Yavatmal', 'MH-YV', 'Amravati', 'Agrarian', '2.8M'),
  ('ratnagiri', 'Ratnagiri', 'MH-RT', 'Konkan', 'Coastal/Hilly', '1.7M');

-- 2. Insert Education Placeholder Data (academic_year 2023-24, data_status 'PLACEHOLDER')
INSERT INTO education_data (district_id, academic_year, ptr_ratio, school_electrification_rate, drinking_water_coverage, digital_labs_rate, secondary_dropout_rate, data_source, data_status)
VALUES
  ('pune', '2023-24', 24.2, 98.4, 99.2, 79.5, 7.8, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('nagpur', '2023-24', 25.8, 96.2, 98.1, 72.0, 9.4, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('nashik', '2023-24', 27.0, 93.5, 96.4, 63.8, 11.2, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('chhatrapati-sambhajinagar', '2023-24', 28.5, 92.1, 95.8, 60.4, 12.8, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('amravati', '2023-24', 27.9, 91.8, 95.0, 58.2, 13.5, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('thane', '2023-24', 23.4, 99.0, 99.4, 82.1, 8.2, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('satara', '2023-24', 25.1, 96.5, 98.0, 71.3, 9.0, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('solapur', '2023-24', 28.1, 91.4, 94.7, 57.9, 13.1, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('nandurbar', '2023-24', 33.4, 82.0, 89.5, 41.2, 18.6, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('gadchiroli', '2023-24', 34.8, 78.5, 87.2, 38.6, 21.4, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('yavatmal', '2023-24', 30.2, 88.0, 92.0, 48.5, 16.2, 'UDISE+ Sample Extract', 'PLACEHOLDER'),
  ('ratnagiri', '2023-24', 24.6, 95.8, 97.5, 68.4, 9.8, 'UDISE+ Sample Extract', 'PLACEHOLDER');

-- 3. Insert Healthcare Placeholder Data (reporting_year 2023-24, data_status 'PLACEHOLDER')
INSERT INTO healthcare_data (district_id, reporting_year, phc_count, beds_per_10k, avg_distance_phc_km, ambulance_coverage_rate, data_source, data_status)
VALUES
  ('pune', '2023-24', 98, 12.8, 5.2, 95.2, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('nagpur', '2023-24', 54, 10.4, 6.8, 92.0, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('nashik', '2023-24', 78, 8.2, 8.4, 89.5, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('chhatrapati-sambhajinagar', '2023-24', 58, 7.6, 9.8, 87.2, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('amravati', '2023-24', 49, 6.8, 10.2, 86.0, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('thane', '2023-24', 82, 13.2, 4.8, 96.1, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('satara', '2023-24', 68, 9.4, 7.1, 91.0, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('solapur', '2023-24', 74, 7.1, 10.5, 85.4, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('nandurbar', '2023-24', 38, 4.9, 14.8, 78.2, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('gadchiroli', '2023-24', 45, 4.2, 17.5, 74.0, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('yavatmal', '2023-24', 56, 5.8, 12.1, 81.3, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER'),
  ('ratnagiri', '2023-24', 62, 8.6, 8.0, 88.9, 'Public Health Dept (Validation Pending)', 'PLACEHOLDER');

-- 4. Insert Drinking Water Placeholder Data (reporting_year 2023-24, data_status 'PLACEHOLDER')
INSERT INTO water_data (district_id, reporting_year, fhtc_coverage_rate, total_villages, har_ghar_jal_villages, testing_labs_count, data_source, data_status)
VALUES
  ('pune', '2023-24', 91.2, 1850, 1420, 14, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('satara', '2023-24', 89.5, 1720, 1280, 11, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('nagpur', '2023-24', 86.8, 1610, 1140, 9, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('thane', '2023-24', 84.1, 840, 590, 8, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('nashik', '2023-24', 78.4, 1920, 1210, 12, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('ratnagiri', '2023-24', 76.9, 1540, 980, 8, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('chhatrapati-sambhajinagar', '2023-24', 73.2, 1340, 780, 9, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('amravati', '2023-24', 71.0, 1650, 890, 8, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('solapur', '2023-24', 68.5, 1140, 620, 10, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('yavatmal', '2023-24', 63.8, 1820, 890, 7, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('nandurbar', '2023-24', 59.4, 940, 420, 5, 'Jal Jeevan Mission Sample', 'PLACEHOLDER'),
  ('gadchiroli', '2023-24', 54.1, 1510, 560, 6, 'Jal Jeevan Mission Sample', 'PLACEHOLDER');

