import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
};

export const createCategory = async (data: { name: string; description?: string }) => {
  const slug = slugify(data.name);
  const existing = await prisma.category.findFirst({
    where: { OR: [{ name: data.name }, { slug }] },
  });
  if (existing) {
    throw ApiError.conflict("A category with this name already exists");
  }
  return prisma.category.create({
    data: { name: data.name, description: data.description, slug },
  });
};

export const updateCategory = async (
  id: string,
  data: { name?: string; description?: string }
) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw ApiError.notFound("Category not found");
  }
  return prisma.category.update({
    where: { id },
    data: {
      ...data,
      slug: data.name ? slugify(data.name) : undefined,
    },
  });
};

export const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw ApiError.notFound("Category not found");
  }
  await prisma.category.delete({ where: { id } });
};
