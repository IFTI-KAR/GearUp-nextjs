import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import * as gearService from "../gear/gear.service";
import * as providerService from "./provider.service";

// --- Gear inventory management ---

export const addGear = catchAsync(async (req: Request, res: Response) => {
  const gear = await gearService.createGear(req.user!.userId, req.body);
  sendResponse(res, { statusCode: 201, message: "Gear item added to inventory", data: gear });
});

export const updateGear = catchAsync(async (req: Request, res: Response) => {
  const gear = await gearService.updateGear(req.params.id, req.user!.userId, req.body);
  sendResponse(res, { statusCode: 200, message: "Gear item updated successfully", data: gear });
});

export const deleteGear = catchAsync(async (req: Request, res: Response) => {
  await gearService.deleteGear(req.params.id, req.user!.userId);
  sendResponse(res, { statusCode: 200, message: "Gear item removed from inventory" });
});

export const getMyGear = catchAsync(async (req: Request, res: Response) => {
  const gear = await gearService.getProviderGear(req.user!.userId);
  sendResponse(res, { statusCode: 200, message: "Provider gear inventory retrieved", data: gear });
});

// --- Order management ---

export const getProviderOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await providerService.getProviderOrders(req.user!.userId);
  sendResponse(res, { statusCode: 200, message: "Provider orders retrieved successfully", data: orders });
});

export const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const order = await providerService.updateOrderStatus(
    req.params.id,
    req.user!.userId,
    req.body.status
  );
  sendResponse(res, { statusCode: 200, message: "Order status updated successfully", data: order });
});
