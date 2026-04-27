import { Prisma } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { Server } from 'socket.io';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { CreateProductBody } from '../schemas/ProductSchemas';

type Params = {
  categoria?: string;
  search?: string;
};

type ProductEvent =
  | { action: 'product_created'; payload: any }
  | { action: 'product_updated'; payload: any }
  | { action: 'product_deleted'; payload: any }
  | { action: 'product_availability_changed'; payload: any };

export interface ServerToClientEvents {
  'product:update': (data: ProductEvent) => void;
}

export class ProductService {
  constructor(private readonly io: Server<any, ServerToClientEvents>) {}

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

    return prisma.product.findMany({
      where: query,
      include: {
        category: { select: { id: true, name: true } },
      },
      orderBy: [{ category: { name: 'desc' } }, { name: 'asc' }],
    });
  }
  async getAllProductsAvailable(params?: Params) {
    const query: Prisma.ProductWhereInput = {
      active: true,
      available: true,
    };

    if (params?.categoria) {
      const category = await prisma.category.findFirst({
        where: {
          name: params.categoria,
        },
      });

      if (!category) {
        throw new AppError('Categoria não encontrada!', 404);
      }

      query.categoryId = category.id;
    }

    if (params?.search) {
      query.name = {
        contains: params.search,
        mode: 'insensitive',
      };
    }

    return prisma.product.findMany({
      where: query,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [{ category: { name: 'desc' } }, { name: 'asc' }],
    });
  }

  async createProduct(data: CreateProductBody) {
    if (!ObjectId.isValid(data.categoryId)) {
      throw new AppError('Categoria inválida!', 400);
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new AppError('Categoria não encontrada!', 404);
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: Number(data.price.toFixed(2)),
        image: data.image,
        description: data.description,
        categoryId: data.categoryId,
        available: true,
      },
    });

    this.io.emit('product:update', {
      action: 'product_created',
      payload: newProduct,
    });

    return newProduct;
  }

  async updateProduct(id: string, data: CreateProductBody) {
    if (!ObjectId.isValid(id)) {
      throw new AppError('Produto inválido!', 400);
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError('Produto não encontrado!', 404);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    this.io.emit('product:update', {
      action: 'product_updated',
      payload: updatedProduct,
    });

    return updatedProduct;
  }

  async removeProduct(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new AppError('Produto inválido!', 400);
    }

    const removedProduct = await prisma.product.update({
      where: { id },
      data: { active: false },
    });

    this.io.emit('product:update', {
      action: 'product_deleted',
      payload: removedProduct,
    });

    return removedProduct;
  }

  async changeAvailability(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new AppError('Produto inválido!', 400);
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError('Produto não encontrado!', 404);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { available: !product.available },
    });

    this.io.emit('product:update', {
      action: 'product_availability_changed',
      payload: updatedProduct,
    });

    return updatedProduct;
  }
}
