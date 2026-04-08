import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductBody, GetProductParams } from '../schemas/ProductSchemas';
import { ProductService } from '../services/ProductService';
import { QueryParams } from '../types/queryParamsProduct';

const service = new ProductService();

export class ProductController {
  async getAllProducts(
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply,
  ) {
    const categoria = request.query.categoria;
    const search = request.query.search;

    const params = {
      categoria: categoria ? categoria : undefined,
      search: search ? search : undefined,
    };

    const products = await service.getAllProducts(params);

    return reply.status(200).send({ data: products });
  }

  async getAllProductsAvaliable(
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply,
  ) {
    const  categoria  = request.query.categoria;

    const products = await service.getAllProductsAvailable(
      categoria ? { categoria } : undefined,
    );

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

    const product = await service.createProduct({
      name,
      price,
      image,
      categoryId,
      description,
    });

    return reply
      .status(201)
      .send({ data: product, message: 'Produto criado!' });
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

  async removeProduct(
    request: FastifyRequest<{ Params: GetProductParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    await service.removeProduct(id);

    return reply.status(200).send({ message: 'Produto removido!' });
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
