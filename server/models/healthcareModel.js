import { db } from '../config/db.js';
import { FALLBACK_HEALTHCARE, FALLBACK_DISTRICTS, FALLBACK_HEALTHCARE_FACILITIES } from '../services/dataStore.js';

export const healthcareModel = {
  async getAll() {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(`
          SELECT h.*, d.district_name, d.division, d.region_type
          FROM healthcare_data h
          JOIN districts d ON h.district_id = d.district_id
          ORDER BY d.district_name ASC
        `);
        return { data: rows, source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[healthcareModel] DB query failed (${err.message}). Using fallback data.`);
    }

    const data = FALLBACK_HEALTHCARE.map((h) => {
      const d = FALLBACK_DISTRICTS.find((dist) => dist.district_id === h.district_id) || {};
      return { ...h, district_name: d.district_name || h.district_id, division: d.division || 'Unknown' };
    });
    return { data, source: 'Development sample data (In-memory)' };
  },

  async getByDistrict(districtId) {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(
          `SELECT h.*, d.district_name, d.division FROM healthcare_data h JOIN districts d ON h.district_id = d.district_id WHERE h.district_id = ?`,
          [districtId]
        );
        if (rows.length > 0) return { data: rows[0], source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[healthcareModel] DB query failed (${err.message}). Using fallback data.`);
    }

    const item = FALLBACK_HEALTHCARE.find((h) => h.district_id.toLowerCase() === districtId.toLowerCase());
    if (!item) return { data: null, source: 'Development sample data (In-memory)' };
    const d = FALLBACK_DISTRICTS.find((dist) => dist.district_id === item.district_id) || {};
    return { data: { ...item, district_name: d.district_name, division: d.division }, source: 'Development sample data (In-memory)' };
  },

  async getFacilities() {
    return {
      data: FALLBACK_HEALTHCARE_FACILITIES,
      source: 'State Public Health Portal (Coordinates validation in progress)',
    };
  },
};
