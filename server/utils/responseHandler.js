/**
 * Standardized API Response Helper for SevaGap REST Services
 */

export function successResponse(res, {
  message = 'Data retrieved successfully',
  data = null,
  statusCode = 200,
  dataStatus = 'PLACEHOLDER',
  source = 'Development sample data',
  reportingYear = '2023-24',
  extraMeta = {},
}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: {
      dataStatus,
      source,
      reportingYear,
      timestamp: new Date().toISOString(),
      ...extraMeta,
    },
  });
}

export function errorResponse(res, {
  message = 'An unexpected error occurred',
  statusCode = 500,
  errors = null,
  errorCode = 'INTERNAL_ERROR',
}) {
  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code: errorCode,
      details: errors,
      timestamp: new Date().toISOString(),
    },
  });
}

