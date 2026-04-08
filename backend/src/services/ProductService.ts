import { Prisma } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { CreateProductBody } from '../schemas/ProductSchemas';

type Params = {
  categoria?: string;
  search?: string;
};

export class ProductService {
  async getAllProducts(params?: Params) {
    const query: Prisma.ProductWhereInput = {
      active: true,
    };

    if (params?.categoria) {
      query.categoryId = params.categoria;
    }

    if (params?.search) {
      query.name = {
        contains: params.search,
        mode: 'insensitive',
      };
    }

    const products = await prisma.product.findMany({
      where: query,
      include: { category: { select: { name: true, id: true } } },
      orderBy: [{ category: { name: 'desc' } }, { name: 'asc' }],
    });

    return products;
  }

  async getAllProductsAvailable(params?: { categoria?: string }) {
    const query: Prisma.ProductWhereInput = {
      active: true,
    };

    if (params?.categoria) {
      const category = await prisma.category.findUnique({
        where: { name: params.categoria },
      });

      if (!category) throw new AppError('Categoria não encontrada!', 404);
      query.categoryId = category.id;
    }

    const products = await prisma.product.findMany({
      where: query,
      include: { category: { select: { name: true } } },
      orderBy: [{ category: { name: 'desc' } }, { name: 'asc' }],
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

  async removeProduct(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Produto inválido!', 400);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError('Produto não encontrado!', 404);

    await prisma.product.update({
      where: { id },
      data: { active: false },
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
