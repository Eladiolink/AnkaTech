import { PrismaClient } from '@prisma/client';
import { ClientStatus } from '../enums';

export default class ClientModel {
  static async getAll(prisma: PrismaClient) {
    return prisma.client.findMany({
      include: {
        assets: true,
      },
    });
  }

  static async getById(prisma: PrismaClient, id: number) {
    return prisma.client.findUnique({
      where: { id },
      include: {
        assets: true,
      },
    });
  }

  static async create(
    prisma: PrismaClient,
    data: { name: string; email: string; status?: ClientStatus }
  ) {
    return prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        status: data.status || ClientStatus.ATIVO,
      },
    });
  }

  static async update(
    prisma: PrismaClient,
    id: number,
    data: { name?: string; email?: string; status?: ClientStatus }
  ) {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  static async delete(prisma: PrismaClient, id: number) {
    return prisma.client.delete({
      where: { id },
    });
  }
}
