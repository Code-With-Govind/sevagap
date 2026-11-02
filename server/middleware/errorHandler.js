import { errorResponse } from '../utils/responseHandler.js';

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(`[Server Error] ${req.method} ${req.url}:`, err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, {
    message,
    statusCode,
    errorCode: err.code || 'SERVER_ERROR',
    errors: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}

export function notFoundHandler(req, res) {
  return errorResponse(res, {
    message: `API endpoint '${req.method} ${req.originalUrl}' was not found.`,
    statusCode: 404,
    errorCode: 'NOT_FOUND',
  });
}

