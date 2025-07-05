class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;

export class InternalServerError extends AppError {
  constructor(message) {
    super(message, 500);
    this.name = "Internal Server Error";
  }
}

export class BadRequestError extends AppError {
  //Missing fields, invalid input (e.g., validation errors)
  constructor(message) {
    super(message, 400);
    this.name = "Bad Request Error";
  }
}

export class UnauthorizedError extends AppError {
  //Invalid token, not logged in
  constructor(message) {
    super(message, 401);
    this.name = "Unauthorized Error";
  }
}

export class ForbiddenError extends AppError {
  //Authenticated but not allowed to access a resource
  constructor(message = "Not Allowed to access") {
    super(message, 403);
    this.name = "Forbidden Error ";
  }
}

export class NotFoundError extends AppError {
  //Resource not found (e.g., blog, user, comment)
  constructor(message) {
    super(message, 404);
    this.name = "Not Found Error";
  }
}

export class ConflictError extends AppError {
  //	Duplicate entry or conflicting resource (e.g., duplicate email)
  constructor(message) {
    super(message, 409);
    this.name = "Conflict Error";
  }
}

// Error Class Name	Status Code	Example Use
// ValidationError	400/422	Input schema or format invalid (Zod/Joi errors)
// AuthenticationError	401/403	Login/token failure
// ResourceLimitError	429/403	Usage limits exceeded
// FileUploadError	400/500	Failed upload, wrong type
// DatabaseError	500	Mongoose/Prisma/internal DB failure
// ThirdPartyServiceError	502/503	API integration issues (e.g., Stripe, ImageKit)
