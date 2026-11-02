import { educationModel } from '../models/educationModel.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const educationController = {
  async getEducation(req, res, next) {
    try {
      const { data, source } = await educationModel.getAll();
      return successResponse(res, {
        message: 'Education indicators retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getEducationByDistrict(req, res, next) {
    try {
      const { districtId } = req.params;
      const { data, source } = await educationModel.getByDistrict(districtId);

      if (!data) {
        return errorResponse(res, {
          message: `Education data for district '${districtId}' was not found.`,
          statusCode: 404,
          errorCode: 'EDUCATION_DATA_NOT_FOUND',
        });
      }

      return successResponse(res, {
        message: `Education data for district '${districtId}' retrieved successfully`,
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },

  async getEducationSummary(req, res, next) {
    try {
      const { data, source } = await educationModel.getSummary();
      return successResponse(res, {
        message: 'Statewide education summary retrieved successfully',
        data,
        source,
      });
    } catch (err) {
      next(err);
    }
  },
};
