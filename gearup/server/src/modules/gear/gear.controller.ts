import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import * as gearService from "./gear.service";

export const getAllGear = catchAsync(async (req: Request, res: Response) => {
  const { items, meta } = await gearService.getAllGear(req.query);
  sendResponse(res, {
    statusCode: 200,
    message: "Gear items retrieved successfully",
    data: items,
    meta,
  });
});

export const getGearById = catchAsync(async (req: Request, res: Response) => {
  const gear = await gearService.getGearById(req.params.id);
  sendResponse(res, { statusCode: 200, message: "Gear item retrieved successfully", data: gear });
});
