import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductBody, GetProductParams } from '../schemas/ProductSchemas';
import { ProductService } from '../services/ProductService';

const service = new ProductService();

export class ProductController {
  async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
    const products = await service.getAllProducts();

    return reply.status(200).send({ data: products });
  }

  async getAllProductsAvaliable(request: FastifyRequest, reply: FastifyReply) {
    const products = await service.getAllProductsAvailable();

    return reply.status(200).send({ data: products });
  }

  async getProductById(
    request: FastifyRequest<{ Params: GetProductParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    const product = await service.getProductById(id);

    return reply.status(200).send({ data: product });
  }

  async createProduct(
    request: FastifyRequest<{ Body: CreateProductBody }>,
    reply: FastifyReply,
  ) {
    const { name, price, categoryId, image, description } = request.body;

    await service.createProduct({
      name,
      price,
      image,
      categoryId,
      description,
    });

    return reply.status(201).send({ message: 'Produto criado!' });
  }

  async updateProduct(
    request: FastifyRequest<{
      Body: CreateProductBody;
      Params: GetProductParams;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { name, price, image, categoryId, description } = request.body;

    await service.updateProduct(id, {
      name,
      price,
      image,
      categoryId,
      description,
    });

    return reply.status(200).send({ message: 'Produto atualizado!' });
  }

  async changeAvailability(
    request: FastifyRequest<{ Params: GetProductParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    await service.changeAvailability(id);

    return reply.status(200).send({ message: 'Disponibilidade alterada!' });
  }
}
