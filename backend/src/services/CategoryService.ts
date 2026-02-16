import { ObjectId } from 'mongodb';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { CreateCategoryBody } from '../schemas/CategorySchemas';

export class CategoryService {
  async getAllCategory() {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async getAllCategoryAvailable() {
    const categories = await prisma.category.findMany({
      where: { available: true },
    });

    return categories;
  }

  async getCategoryById(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Categoria inválida!', 400);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new AppError('Categoria não encontrado!', 404);

    return category;
  }
  async createCategory(data: CreateCategoryBody) {
    const categoryExists = await prisma.category.findFirst({
      where: { name: data.name },
    });

    if (categoryExists) throw new AppError('Categoria já cadastrada!', 409);

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        available: true,
      },
    });

    return newCategory;
  }

  async updateCategory(id: string, data: CreateCategoryBody) {
    if (!ObjectId.isValid(id)) throw new AppError('Categoria inválido!', 400);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new AppError('Categoria não encontrado!', 404);

    const categoryUpdate = prisma.category.update({
      where: { id },
      data,
    });

    return categoryUpdate;
  }

  async changeAvailability(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Categoria inválido!', 400);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new AppError('Categoria não encontrado!', 404);

    await prisma.category.update({
      where: { id },
      data: { available: !category.available },
    });

    return;
  }
}
