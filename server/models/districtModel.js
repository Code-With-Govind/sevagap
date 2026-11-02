import { db } from '../config/db.js';
import { FALLBACK_DISTRICTS } from '../services/dataStore.js';

export const districtModel = {
  async getAll() {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(
          'SELECT district_id, district_name, district_code, division, region_type, population, created_at, updated_at FROM districts ORDER BY district_name ASC'
        );
        return { data: rows, source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[districtModel] DB query failed (${err.message}). Using fallback data.`);
    }
    return { data: FALLBACK_DISTRICTS, source: 'Development sample data (In-memory)' };
  },

  async getById(districtId) {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(
          'SELECT district_id, district_name, district_code, division, region_type, population, created_at, updated_at FROM districts WHERE district_id = ?',
          [districtId]
        );
        if (rows.length > 0) {
          return { data: rows[0], source: 'MySQL Database' };
        }
      }
    } catch (err) {
      console.warn(`[districtModel] DB query failed (${err.message}). Using fallback data.`);
    }
    const found = FALLBACK_DISTRICTS.find((d) => d.district_id.toLowerCase() === districtId.toLowerCase());
    return { data: found || null, source: 'Development sample data (In-memory)' };
  },
};

