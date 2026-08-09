export class ApiError extends Error {
  public statusCode: number;
  public errorDetails?: unknown;

  constructor(statusCode: number, message: string, errorDetails?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request", errorDetails?: unknown) {
    return new ApiError(400, message, errorDetails);
  }
  static unauthorized(message = "Unauthorized", errorDetails?: unknown) {
    return new ApiError(401, message, errorDetails);
  }
  static forbidden(message = "Forbidden", errorDetails?: unknown) {
    return new ApiError(403, message, errorDetails);
  }
  static notFound(message = "Not Found", errorDetails?: unknown) {
    return new ApiError(404, message, errorDetails);
  }
  static conflict(message = "Conflict", errorDetails?: unknown) {
    return new ApiError(409, message, errorDetails);
  }
  static internal(message = "Internal Server Error", errorDetails?: unknown) {
    return new ApiError(500, message, errorDetails);
  }
}
