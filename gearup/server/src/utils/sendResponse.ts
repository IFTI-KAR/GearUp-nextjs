import { Response } from "express";

interface SuccessResponsePayload<T> {
  statusCode: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendResponse = <T>(res: Response, payload: SuccessResponsePayload<T>) => {
  return res.status(payload.statusCode).json({
    success: true,
    message: payload.message,
    meta: payload.meta,
    data: payload.data ?? null,
  });
};
