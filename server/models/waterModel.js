import { db } from '../config/db.js';
import { FALLBACK_WATER, FALLBACK_DISTRICTS } from '../services/dataStore.js';

export const waterModel = {
  async getAll() {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(`
          SELECT w.*, d.district_name, d.division, d.region_type
          FROM water_data w
          JOIN districts d ON w.district_id = d.district_id
          ORDER BY d.district_name ASC
        `);
        return { data: rows, source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[waterModel] DB query failed (${err.message}). Using fallback data.`);
    }

    const data = FALLBACK_WATER.map((w) => {
      const d = FALLBACK_DISTRICTS.find((dist) => dist.district_id === w.district_id) || {};
      return { ...w, district_name: d.district_name || w.district_id, division: d.division || 'Unknown' };
    });
    return { data, source: 'Development sample data (In-memory)' };
  },

  async getByDistrict(districtId) {
    try {
      if (db.isConnected) {
        const [rows] = await db.query(
          `SELECT w.*, d.district_name, d.division FROM water_data w JOIN districts d ON w.district_id = d.district_id WHERE w.district_id = ?`,
          [districtId]
        );
        if (rows.length > 0) return { data: rows[0], source: 'MySQL Database' };
      }
    } catch (err) {
      console.warn(`[waterModel] DB query failed (${err.message}). Using fallback data.`);
    }

    const item = FALLBACK_WATER.find((w) => w.district_id.toLowerCase() === districtId.toLowerCase());
    if (!item) return { data: null, source: 'Development sample data (In-memory)' };
    const d = FALLBACK_DISTRICTS.find((dist) => dist.district_id === item.district_id) || {};
    return { data: { ...item, district_name: d.district_name, division: d.division }, source: 'Development sample data (In-memory)' };
  },

  async getSummary() {
    const { data } = await this.getAll();
    if (!data || data.length === 0) return { data: null };

    const count = data.length;
    const avgFhtc = (data.reduce((acc, curr) => acc + Number(curr.fhtc_coverage_rate), 0) / count).toFixed(1);
    const totalVillages = data.reduce((acc, curr) => acc + Number(curr.total_villages), 0);
    const totalHarGharJal = data.reduce((acc, curr) => acc + Number(curr.har_ghar_jal_villages), 0);
    const totalLabs = data.reduce((acc, curr) => acc + Number(curr.testing_labs_count), 0);

    return {
      data: {
        totalDistrictsMonitored: count,
        avgFhtcCoverageRate: `${avgFhtc}%`,
        totalSurveyedVillages: totalVillages.toLocaleString(),
        totalHarGharJalVillages: totalHarGharJal.toLocaleString(),
        villageSaturationPercentage: `${((totalHarGharJal / totalVillages) * 100).toFixed(1)}%`,
        activeTestingLaboratories: totalLabs,
        nationalTarget: '100% Functional Tap Connections',
        reportingYear: '2023-24',
      },
      source: 'Jal Jeevan Mission Aggregated Indicator',
    };
  },
};

