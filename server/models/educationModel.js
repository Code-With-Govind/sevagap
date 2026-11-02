import { db } from '../config/db.js';
import { FALLBACK_EDUCATION, FALLBACK_DISTRICTS } from '../services/dataStore.js';

export const educationModel = {
  async getAll() {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(`
          SELECT e.*, d.district_name, d.division, d.region_type
          FROM education_data e
          JOIN districts d ON e.district_id = d.district_id
          ORDER BY d.district_name ASC
        `);
        return { data: rows, source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[educationModel] DB query failed (${err.message}). Using fallback data.`);
    }

    const data = FALLBACK_EDUCATION.map((e) => {
      const d = FALLBACK_DISTRICTS.find((dist) => dist.district_id === e.district_id) || {};
      return { ...e, district_name: d.district_name || e.district_id, division: d.division || 'Unknown' };
    });
    return { data, source: 'Development sample data (In-memory)' };
  },

  async getByDistrict(districtId) {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(
          `SELECT e.*, d.district_name, d.division FROM education_data e JOIN districts d ON e.district_id = d.district_id WHERE e.district_id = ?`,
          [districtId]
        );
        if (rows.length > 0) return { data: rows[0], source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[educationModel] DB query failed (${err.message}). Using fallback data.`);
    }

    const item = FALLBACK_EDUCATION.find((e) => e.district_id.toLowerCase() === districtId.toLowerCase());
    if (!item) return { data: null, source: 'Development sample data (In-memory)' };
    const d = FALLBACK_DISTRICTS.find((dist) => dist.district_id === item.district_id) || {};
    return { data: { ...item, district_name: d.district_name, division: d.division }, source: 'Development sample data (In-memory)' };
  },

  async getSummary() {
    const { data } = await this.getAll();
    if (!data || data.length === 0) return { data: null };

    const count = data.length;
    const avgPtr = (data.reduce((acc, curr) => acc + Number(curr.ptr_ratio), 0) / count).toFixed(1);
    const avgElectrification = (data.reduce((acc, curr) => acc + Number(curr.school_electrification_rate), 0) / count).toFixed(1);
    const avgWater = (data.reduce((acc, curr) => acc + Number(curr.drinking_water_coverage), 0) / count).toFixed(1);
    const avgDigital = (data.reduce((acc, curr) => acc + Number(curr.digital_labs_rate), 0) / count).toFixed(1);
    const avgDropout = (data.reduce((acc, curr) => acc + Number(curr.secondary_dropout_rate), 0) / count).toFixed(1);

    return {
      data: {
        totalDistrictsCovered: count,
        avgPtrRatio: `${avgPtr} : 1`,
        avgSchoolElectrification: `${avgElectrification}%`,
        avgDrinkingWaterCoverage: `${avgWater}%`,
        avgDigitalLabsAvailability: `${avgDigital}%`,
        avgSecondaryDropoutRate: `${avgDropout}%`,
        benchmarkPtr: '30 : 1 (RTE Norm)',
        academicYear: '2023-24',
      },
      source: 'Aggregated from indicators',
    };
  },
};
