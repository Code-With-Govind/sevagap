// SevaGap Axios API Integration Service
// Configured to communicate with the Python/FastAPI backend once available,
// with automatic fallback to placeholder datasets during development and data-collection phases.

import axios from 'axios';
import {
  OVERVIEW_KPI_STATS,
  MAHARASHTRA_DISTRICTS,
  DISTRICT_COMPARISON_DATA,
  EDUCATION_SECTOR_DATA,
  HEALTHCARE_SECTOR_DATA,
  WATER_SECTOR_DATA,
} from '../data/placeholderData';

// API Base URL from environment variable or local dev server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for logging / token injection
apiClient.interceptors.request.use(
  (config) => {
    // Helpful log during development
    if (import.meta.env.DEV) {
      console.debug(`[SevaGap API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with graceful error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(`[SevaGap API] Server not reachable or endpoint error: ${error.message}. Using fallback dataset.`);
    return Promise.reject(error);
  }
);

export const sevagapApi = {
  /**
   * Fetch high-level overview KPIs
   */
  async getOverviewStats() {
    try {
      const response = await apiClient.get('/overview/stats');
      return { data: response.data, isMock: false };
    } catch {
      return { data: OVERVIEW_KPI_STATS, isMock: true };
    }
  },

  /**
   * Fetch all Maharashtra districts with composite index
   */
  async getDistricts() {
    try {
      const response = await apiClient.get('/districts');
      return { data: response.data, isMock: false };
    } catch {
      return { data: MAHARASHTRA_DISTRICTS, isMock: true };
    }
  },

  /**
   * Fetch multi-sector comparative data across districts
   */
  async getDistrictComparisons() {
    try {
      const response = await apiClient.get('/districts/comparisons');
      return { data: response.data, isMock: false };
    } catch {
      return { data: DISTRICT_COMPARISON_DATA, isMock: true };
    }
  },

  /**
   * Fetch specific district deep-dive info
   */
  async getDistrictDetail(districtId) {
    try {
      const response = await apiClient.get(`/districts/${districtId}`);
      return { data: response.data, isMock: false };
    } catch {
      const district = MAHARASHTRA_DISTRICTS.find((d) => d.id === districtId) || MAHARASHTRA_DISTRICTS[0];
      return { data: district, isMock: true };
    }
  },

  /**
   * Fetch Education sector indicators and division breakdown (UDISE+ based)
   */
  async getEducationData() {
    try {
      const response = await apiClient.get('/sector/education');
      return { data: response.data, isMock: false };
    } catch {
      return { data: EDUCATION_SECTOR_DATA, isMock: true };
    }
  },

  /**
   * Fetch Healthcare sector indicators, bed ratios, and facility coordinates
   */
  async getHealthcareData() {
    try {
      const response = await apiClient.get('/sector/healthcare');
      return { data: response.data, isMock: false };
    } catch {
      return { data: HEALTHCARE_SECTOR_DATA, isMock: true };
    }
  },

  /**
   * Fetch Drinking Water (JJM) sector indicators and district tap coverage
   */
  async getDrinkingWaterData() {
    try {
      const response = await apiClient.get('/sector/drinking-water');
      return { data: response.data, isMock: false };
    } catch {
      return { data: WATER_SECTOR_DATA, isMock: true };
    }
  },
};

export default apiClient;

