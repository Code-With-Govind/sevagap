import { districtModel } from './districtModel.js';
import { educationModel } from './educationModel.js';
import { healthcareModel } from './healthcareModel.js';
import { waterModel } from './waterModel.js';

export const analyticsModel = {
  async getDashboard() {
    const [districtsRes, eduRes, waterRes] = await Promise.all([
      districtModel.getAll(),
      educationModel.getSummary(),
      waterModel.getSummary(),
    ]);

    const kpiCards = [
      {
        id: 'fhtc-coverage',
        title: 'Drinking Water Tap Connections',
        value: waterRes.data?.avgFhtcCoverageRate || '79.4%',
        change: '+8.2% YoY',
        trend: 'up',
        benchmark: 'National Target: 100%',
        sector: 'water',
        description: 'Functional Household Tap Connections (FHTC) across rural Maharashtra villages.',
      },
      {
        id: 'ptr-ratio',
        title: 'Pupil-Teacher Ratio (PTR)',
        value: eduRes.data?.avgPtrRatio || '26.4 : 1',
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

    return {
      data: {
        summaryCards: kpiCards,
        totalMonitoredDistricts: districtsRes.data.length,
        sectorsCovered: ['School Education', 'Public Healthcare', 'Rural Drinking Water'],
        educationSummary: eduRes.data,
        waterSummary: waterRes.data,
      },
      source: 'Cross-Sector Aggregated Decision Support Index',
    };
  },

  async getDistrictComparison() {
    const [districtsRes, eduRes, healthRes, waterRes] = await Promise.all([
      districtModel.getAll(),
      educationModel.getAll(),
      healthcareModel.getAll(),
      waterModel.getAll(),
    ]);

    const districts = districtsRes.data;
    const eduList = eduRes.data;
    const healthList = healthRes.data;
    const waterList = waterRes.data;

    const comparisons = districts.map((d) => {
      const e = eduList.find((item) => item.district_id === d.district_id) || {};
      const h = healthList.find((item) => item.district_id === d.district_id) || {};
      const w = waterList.find((item) => item.district_id === d.district_id) || {};

      // Standardize scores onto 0-100 scale for comparison
      const eduScore = e.school_electrification_rate ? Math.round(Number(e.school_electrification_rate) * 0.9) : 75;
      const healthScore = h.beds_per_10k ? Math.round(Math.min(Number(h.beds_per_10k) * 6.5, 95)) : 70;
      const waterScore = w.fhtc_coverage_rate ? Math.round(Number(w.fhtc_coverage_rate)) : 72;
      const compositeScore = Math.round((eduScore * 0.35 + healthScore * 0.35 + waterScore * 0.30));

      return {
        districtId: d.district_id,
        district: d.district_name,
        division: d.division,
        education: eduScore,
        healthcare: healthScore,
        water: waterScore,
        composite: compositeScore,
      };
    });

    return {
      data: comparisons,
      source: 'Normalized Multi-Sector Spatial Gap Modeling',
    };
  },
};
