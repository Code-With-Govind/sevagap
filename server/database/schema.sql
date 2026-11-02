-- ========================================================
-- SevaGap Database Schema
-- Database: sevagap_db
-- Description: Maharashtra District Public Service Gap Analysis
-- Notice: Contains schema definitions for initial development.
-- All development sample data carries data_status = 'PLACEHOLDER'.
-- ========================================================

CREATE DATABASE IF NOT EXISTS sevagap_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sevagap_db;

-- 1. Districts Master Table
CREATE TABLE IF NOT EXISTS districts (
  district_id VARCHAR(50) PRIMARY KEY,
  district_name VARCHAR(100) NOT NULL,
  district_code VARCHAR(20) UNIQUE,
  division VARCHAR(50) NOT NULL,
  region_type VARCHAR(50) DEFAULT 'Mixed',
  population VARCHAR(20) DEFAULT 'N/A',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_division (division)
) ENGINE=InnoDB;

-- 2. Education Data Table
CREATE TABLE IF NOT EXISTS education_data (
  education_id INT AUTO_INCREMENT PRIMARY KEY,
  district_id VARCHAR(50) NOT NULL,
  academic_year VARCHAR(20) DEFAULT '2023-24',
  ptr_ratio DECIMAL(5,2) COMMENT 'Pupil-Teacher Ratio (Benchmark <= 30)',
  school_electrification_rate DECIMAL(5,2) COMMENT 'Schools with functional electricity %',
  drinking_water_coverage DECIMAL(5,2) COMMENT 'Schools with functional drinking water %',
  digital_labs_rate DECIMAL(5,2) COMMENT 'Schools with ICT / computer labs %',
  secondary_dropout_rate DECIMAL(5,2) COMMENT 'Secondary dropout %',
  data_source VARCHAR(100) DEFAULT 'UDISE+',
  data_status VARCHAR(50) DEFAULT 'PLACEHOLDER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_edu_district FOREIGN KEY (district_id)
    REFERENCES districts(district_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_edu_status (data_status),
  INDEX idx_edu_district (district_id)
) ENGINE=InnoDB;

-- 3. Healthcare Data Table
CREATE TABLE IF NOT EXISTS healthcare_data (
  healthcare_id INT AUTO_INCREMENT PRIMARY KEY,
  district_id VARCHAR(50) NOT NULL,
  reporting_year VARCHAR(20) DEFAULT '2023-24',
  phc_count INT DEFAULT 0 COMMENT 'Total Primary Health Centres',
  beds_per_10k DECIMAL(5,2) DEFAULT 0 COMMENT 'Govt hospital beds per 10k population',
  avg_distance_phc_km DECIMAL(5,2) DEFAULT 0 COMMENT 'Average transit distance to PHC in km',
  ambulance_coverage_rate DECIMAL(5,2) DEFAULT 0 COMMENT '108 Ambulance response coverage %',
  data_source VARCHAR(100) DEFAULT 'Public Health Dept (Validation Pending)',
  data_status VARCHAR(50) DEFAULT 'PLACEHOLDER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_health_district FOREIGN KEY (district_id)
    REFERENCES districts(district_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_health_status (data_status),
  INDEX idx_health_district (district_id)
) ENGINE=InnoDB;

-- 4. Drinking Water Data Table
CREATE TABLE IF NOT EXISTS water_data (
  water_id INT AUTO_INCREMENT PRIMARY KEY,
  district_id VARCHAR(50) NOT NULL,
  reporting_year VARCHAR(20) DEFAULT '2023-24',
  fhtc_coverage_rate DECIMAL(5,2) DEFAULT 0 COMMENT 'Functional Household Tap Connection %',
  total_villages INT DEFAULT 0 COMMENT 'Total surveyed villages',
  har_ghar_jal_villages INT DEFAULT 0 COMMENT 'Villages with 100% tap water saturation',
  testing_labs_count INT DEFAULT 0 COMMENT 'Active water quality testing laboratories',
  data_source VARCHAR(100) DEFAULT 'Jal Jeevan Mission',
  data_status VARCHAR(50) DEFAULT 'PLACEHOLDER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_water_district FOREIGN KEY (district_id)
    REFERENCES districts(district_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_water_status (data_status),
  INDEX idx_water_district (district_id)
) ENGINE=InnoDB;

