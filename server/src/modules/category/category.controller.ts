import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import * as categoryService from "./category.service";

export const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  sendResponse(res, { statusCode: 200, message: "Categories retrieved successfully", data: categories });
});

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
