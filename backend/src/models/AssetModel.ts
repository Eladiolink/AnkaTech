import { PrismaClient } from '@prisma/client';

export default class AssetModel {
  static async getAllByClient(prisma: PrismaClient, clientId: number) {
    return prisma.asset.findMany({
      where: { clientId },
    });
  }

  static async getById(prisma: PrismaClient, id: number) {
    return prisma.asset.findUnique({
      where: { id },
    });
  }

  static async create(
    prisma: PrismaClient,
    data: { name: string; currentValue: number; clientId: number }
  ) {
    return prisma.asset.create({
      data: {
        name: data.name,
        currentValue: data.currentValue,
        clientId: data.clientId,
      },
    });
  }

  static async update(
    prisma: PrismaClient,
    id: number,
    data: { name?: string; currentValue?: number }
  ) {
    return prisma.asset.update({
      where: { id },
      data,
    });
  }

  static async delete(prisma: PrismaClient, id: number) {
    return prisma.asset.delete({
      where: { id },
    });
  }

  static async getAll(prisma: PrismaClient) {
    return prisma.asset.findMany({
      select: {
        id: true,
        name: true,
        currentValue: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

}
