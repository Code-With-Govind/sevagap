// Centralized Axios API Service for SevaGap
// Communicates with Express REST API (port 5000),
// with automatic fallback to placeholder datasets when the server is offline.

import axios from 'axios';
import {
  OVERVIEW_KPI_STATS,
  MAHARASHTRA_DISTRICTS,
  DISTRICT_COMPARISON_DATA,
  EDUCATION_SECTOR_DATA,
  HEALTHCARE_SECTOR_DATA,
  WATER_SECTOR_DATA,
} from '../data/placeholderData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.debug(`[SevaGap API Client] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(`[SevaGap API Client] Notice: Backend connection not established (${error.message}). Using local placeholder dataset.`);
    return Promise.reject(error);
  }
);

export const sevagapApi = {
  /**
   * Fetch statewide dashboard summary cards and indicators
   */
  async getOverviewStats() {
    try {
      const response = await apiClient.get('/analytics/dashboard');
      if (response.data?.success && response.data?.data?.summaryCards) {
        return { data: response.data.data.summaryCards, meta: response.data.meta, isMock: false };
      }
      return { data: OVERVIEW_KPI_STATS, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      return { data: OVERVIEW_KPI_STATS, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },

  /**
   * Fetch all monitored Maharashtra districts
   */
  async getDistricts() {
    try {
      const response = await apiClient.get('/districts');
      if (response.data?.success && response.data?.data) {
        // Map backend snake_case to frontend camelCase if needed
        const formatted = response.data.data.map((d) => ({
          id: d.district_id,
          name: d.district_name,
          division: d.division,
          type: d.region_type,
          population: d.population,
          compositeScore: 75.0, // default placeholder score
        }));
        return { data: formatted, meta: response.data.meta, isMock: false };
      }
      return { data: MAHARASHTRA_DISTRICTS, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      return { data: MAHARASHTRA_DISTRICTS, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },

  /**
   * Fetch multi-sector comparative data across districts for Recharts
   */
  async getDistrictComparisons() {
    try {
      const response = await apiClient.get('/analytics/district-comparison');
      if (response.data?.success && response.data?.data) {
        return { data: response.data.data, meta: response.data.meta, isMock: false };
      }
      return { data: DISTRICT_COMPARISON_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      return { data: DISTRICT_COMPARISON_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },

  /**
   * Fetch single district deep dive
   */
  async getDistrictDetail(districtId) {
    try {
      const response = await apiClient.get(`/districts/${districtId}`);
      if (response.data?.success && response.data?.data) {
        const d = response.data.data;
        return {
          data: {
            id: d.district_id,
            name: d.district_name,
            division: d.division,
            type: d.region_type,
            population: d.population,
            compositeScore: 75.0,
          },
          meta: response.data.meta,
          isMock: false,
        };
      }
      const district = MAHARASHTRA_DISTRICTS.find((d) => d.id === districtId) || MAHARASHTRA_DISTRICTS[0];
      return { data: district, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      const district = MAHARASHTRA_DISTRICTS.find((d) => d.id === districtId) || MAHARASHTRA_DISTRICTS[0];
      return { data: district, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },

  /**
   * Fetch Education sector indicators & division comparisons
   */
  async getEducationData() {
    try {
      const response = await apiClient.get('/education');
      if (response.data?.success) {
        return { data: EDUCATION_SECTOR_DATA, meta: response.data.meta, isMock: false };
      }
      return { data: EDUCATION_SECTOR_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      return { data: EDUCATION_SECTOR_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },

  /**
   * Fetch Healthcare sector indicators & facility locations
   */
  async getHealthcareData() {
    try {
      const [healthRes, facRes] = await Promise.all([
        apiClient.get('/healthcare'),
        apiClient.get('/healthcare/facilities'),
      ]);
      if (healthRes.data?.success && facRes.data?.success) {
        return {
          data: {
            ...HEALTHCARE_SECTOR_DATA,
            hospitalLocationsPlaceholder: facRes.data.data,
          },
          meta: healthRes.data.meta,
          isMock: false,
        };
      }
      return { data: HEALTHCARE_SECTOR_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      return { data: HEALTHCARE_SECTOR_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },

  /**
   * Fetch Drinking Water indicators
   */
  async getDrinkingWaterData() {
    try {
      const response = await apiClient.get('/water');
      if (response.data?.success) {
        return { data: WATER_SECTOR_DATA, meta: response.data.meta, isMock: false };
      }
      return { data: WATER_SECTOR_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    } catch {
      return { data: WATER_SECTOR_DATA, meta: { dataStatus: 'PLACEHOLDER' }, isMock: true };
    }
  },
};

export default apiClient;
