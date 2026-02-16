import { ObjectId } from 'mongodb';
import { prisma } from '../repository/prisma';
import { AppError } from '../errors/AppError';
import { CreateProductBody } from '../schemas/ProductSchemas';

export class ProductService {
  async getAllProducts() {
    const products = await prisma.product.findMany({
      include: { category: { select: { name: true } } },
    });

    return products;
  }

  async getAllProductsAvailable() {
    const products = await prisma.product.findMany({
      where: { available: true },
      include: { category: { select: { name: true } } },
    });

    return products;
  }

  async getProductById(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Produto inválido!', 400);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError('Produto não encontrado!', 404);

    return product;
  }

  async createProduct(data: CreateProductBody) {
    if (!ObjectId.isValid(data.categoryId))
      throw new AppError('Categoria inválida!', 400);

    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) throw new AppError('Categoria não encontrada!', 404);

    await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        image: data.image,
        categoryId: data.categoryId,
        description: data.description,
        available: true,
      },
    });

    return;
  }

  async updateProduct(id: string, data: CreateProductBody) {
    if (!ObjectId.isValid(id)) throw new AppError('Produto inválido!', 400);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError('Produto não encontrado!', 404);

    if (!ObjectId.isValid(data.categoryId))
      throw new AppError('Categoria inválida!', 400);

    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) throw new AppError('Categoria não encontrada!', 404);

    await prisma.product.update({
      where: { id },
      data,
    });

    return;
  }

  async changeAvailability(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Produto inválido!', 400);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError('Produto não encontrado!', 404);

    await prisma.product.update({
      where: { id },
      data: { available: !product.available },
    });

    return;
  }
}
