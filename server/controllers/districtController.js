import { districtModel } from '../models/districtModel.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const districtController = {
  async getDistricts(req, res, next) {
    try {
      const { data, source } = await districtModel.getAll();
      return successResponse(res, {
        message: 'Districts retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getDistrictById(req, res, next) {
    try {
      const { districtId } = req.params;
      const { data, source } = await districtModel.getById(districtId);

      if (!data) {
        return errorResponse(res, {
          message: `District with identifier '${districtId}' was not found.`,
          statusCode: 404,
          errorCode: 'DISTRICT_NOT_FOUND',
        });
      }

      return successResponse(res, {
        message: `District details for '${data.district_name}' retrieved successfully`,
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },
};
