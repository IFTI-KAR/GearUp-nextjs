import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import * as adminService from "./admin.service";
import * as categoryService from "../category/category.service";

// --- Users ---

export const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await adminService.getAllUsers();
  sendResponse(res, { statusCode: 200, message: "Users retrieved successfully", data: users });
});

export const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const user = await adminService.updateUserStatus(req.params.id, req.body.status);
  sendResponse(res, { statusCode: 200, message: "User status updated successfully", data: user });
});

// --- Gear ---

export const getAllGearItems = catchAsync(async (_req: Request, res: Response) => {
  const gear = await adminService.getAllGearItems();
  sendResponse(res, { statusCode: 200, message: "Gear items retrieved successfully", data: gear });
});

// --- Rentals ---

export const getAllRentalOrders = catchAsync(async (_req: Request, res: Response) => {
  const orders = await adminService.getAllRentalOrders();
  sendResponse(res, { statusCode: 200, message: "Rental orders retrieved successfully", data: orders });
});

// --- Categories ---

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  sendResponse(res, { statusCode: 201, message: "Category created successfully", data: category });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  sendResponse(res, { statusCode: 200, message: "Category updated successfully", data: category });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await categoryService.deleteCategory(req.params.id);
  sendResponse(res, { statusCode: 200, message: "Category deleted successfully" });
});
