import { Prisma } from '@prisma/client';

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

export type OrderWithUserAndItems = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        phone: true;
        addresses: {
          where: { isDefault: true };
          take: 1;
        };
      };
    };
    items: {
      include: {
        product: {
          select: {
            name: true;
            price: true;
          };
        };
      };
    };
  };
}>;
