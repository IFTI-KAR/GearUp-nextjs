import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

interface ErrorResponseBody {
  success: false;
  message: string;
  errorDetails?: unknown;
  stack?: string;
}

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: unknown = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.errorDetails;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    if (err.code === "P2002") {
      message = `Duplicate value for field(s): ${(err.meta?.target as string[])?.join(", ")}`;
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Requested resource was not found";
    } else if (err.code === "P2003") {
      message = "Invalid reference to a related resource";
    } else {
      message = "Database request error";
    }
    errorDetails = { code: err.code, meta: err.meta };
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided to database query";
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  const body: ErrorResponseBody = {
    success: false,
    message,
    errorDetails,
  };

  if (env.NODE_ENV === "development" && err instanceof Error) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};
