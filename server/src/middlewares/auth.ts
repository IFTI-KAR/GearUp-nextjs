import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { catchAsync } from "../utils/catchAsync";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../config/prisma";
import { Role } from "@prisma/client";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: Role;
      };
    }
  }
}

/**
 * Verifies the Bearer JWT, loads the user, and rejects banned/suspended accounts.
 */
export const auth = (...allowedRoles: Role[]) => {
  return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Authentication token is missing");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      throw ApiError.unauthorized("Invalid or expired token");
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw ApiError.unauthorized("User no longer exists");
    }

    if (user.status === "SUSPENDED") {
      throw ApiError.forbidden("Your account has been suspended. Contact support.");
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      throw ApiError.forbidden("You do not have permission to perform this action");
    }

    req.user = { userId: user.id, email: user.email, role: user.role };
    next();
  });
};
