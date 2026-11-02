import { healthcareModel } from '../models/healthcareModel.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const healthcareController = {
  async getHealthcare(req, res, next) {
    try {
      const { data, source } = await healthcareModel.getAll();
      return successResponse(res, {
        message: 'Healthcare indicators retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getHealthcareByDistrict(req, res, next) {
    try {
      const { districtId } = req.params;
      const { data, source } = await healthcareModel.getByDistrict(districtId);

      if (!data) {
        return errorResponse(res, {
          message: `Healthcare data for district '${districtId}' was not found.`,
          statusCode: 404,
          errorCode: 'HEALTHCARE_DATA_NOT_FOUND',
        });
      }

      return successResponse(res, {
        message: `Healthcare data for district '${districtId}' retrieved successfully`,
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getFacilities(req, res, next) {
    try {
      const { data, source } = await healthcareModel.getFacilities();
      return successResponse(res, {
        message: 'Healthcare facilities for GIS mapping retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },
};

