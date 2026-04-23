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

export interface ServerToClientEvents {
  productUpdate: (data: {
    type:
      | 'NEW_PRODUCT'
      | 'UPDATE_PRODUCT'
      | 'CANCEL_PRODUCT'
      | 'CHANGE_STATUS_PRODUCT';
    productData: any;
  }) => void;
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
      available: true,
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

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: Number(data.price.toFixed(2)),
        image: data.image,
        categoryId: data.categoryId,
        description: data.description,
        available: true,
      },
    });

    this.io.emit('productUpdate', {
      type: 'NEW_PRODUCT',
      productData: newProduct,
    });
    return newProduct;
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

    const updateProduct = await prisma.product.update({
      where: { id },
      data,
    });

    this.io.emit('productUpdate', {
      type: 'UPDATE_PRODUCT',
      productData: updateProduct,
    });
    return;
  }

  async removeProduct(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Produto inválido!', 400);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError('Produto não encontrado!', 404);

    const removedProduct = await prisma.product.update({
      where: { id },
      data: { active: false },
    });

    this.io.emit('productUpdate', {
      type: 'CANCEL_PRODUCT',
      productData: removedProduct,
    });

    return;
  }

  async changeAvailability(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Produto inválido!', 400);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError('Produto não encontrado!', 404);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { available: !product.available },
    });

    this.io.emit('productUpdate', {
      type: 'CHANGE_STATUS_PRODUCT',
      productData: updatedProduct,
    });

    return;
  }
}
