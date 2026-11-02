import { errorResponse } from '../utils/responseHandler.js';

export function validateDistrictIdParam(req, res, next) {
  const { districtId } = req.params;
  if (!districtId || typeof districtId !== 'string' || districtId.trim().length === 0) {
    return errorResponse(res, {
      message: 'Invalid districtId parameter provided.',
      statusCode: 400,
      errorCode: 'INVALID_PARAMETER',
    });
  }
  // Sanitize districtId (alphanumeric and dashes only)
  req.params.districtId = districtId.trim().toLowerCase();
  next();
}

