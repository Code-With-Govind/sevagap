import { waterModel } from '../models/waterModel.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const waterController = {
  async getWater(req, res, next) {
    try {
      const { data, source } = await waterModel.getAll();
      return successResponse(res, {
        message: 'Drinking water indicators retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getWaterByDistrict(req, res, next) {
    try {
      const { districtId } = req.params;
      const { data, source } = await waterModel.getByDistrict(districtId);

      if (!data) {
        return errorResponse(res, {
          message: `Drinking water data for district '${districtId}' was not found.`,
          statusCode: 404,
          errorCode: 'WATER_DATA_NOT_FOUND',
        });
      }

      return successResponse(res, {
        message: `Drinking water data for district '${districtId}' retrieved successfully`,
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getWaterSummary(req, res, next) {
    try {
      const { data, source } = await waterModel.getSummary();
      return successResponse(res, {
        message: 'Statewide drinking water summary retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },
};
