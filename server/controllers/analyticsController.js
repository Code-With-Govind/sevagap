import { analyticsModel } from '../models/analyticsModel.js';
import { successResponse } from '../utils/responseHandler.js';

export const analyticsController = {
  async getDashboard(req, res, next) {
    try {
      const { data, source } = await analyticsModel.getDashboard();
      return successResponse(res, {
        message: 'Dashboard composite analytics retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getDistrictComparison(req, res, next) {
    try {
      const { data, source } = await analyticsModel.getDistrictComparison();
      return successResponse(res, {
        message: 'District multi-sector comparisons retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },
};

