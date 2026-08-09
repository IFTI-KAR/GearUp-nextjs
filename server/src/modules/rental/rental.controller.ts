import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import * as rentalService from "./rental.service";

export const createRentalOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await rentalService.createRentalOrder(req.user!.userId, req.body);
  sendResponse(res, { statusCode: 201, message: "Rental order created successfully", data: order });
});

export const getUserRentalOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await rentalService.getUserRentalOrders(req.user!.userId, req.user!.role);
  sendResponse(res, { statusCode: 200, message: "Rental orders retrieved successfully", data: orders });
});

export const getRentalOrderById = catchAsync(async (req: Request, res: Response) => {
  const order = await rentalService.getRentalOrderById(
    req.params.id,
    req.user!.userId,
    req.user!.role
  );
  sendResponse(res, { statusCode: 200, message: "Rental order retrieved successfully", data: order });
});

export const cancelRentalOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await rentalService.cancelRentalOrder(req.params.id, req.user!.userId);
  sendResponse(res, { statusCode: 200, message: "Rental order cancelled successfully", data: order });
});
