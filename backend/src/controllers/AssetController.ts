import { FastifyRequest, FastifyReply } from 'fastify';
import AssetModel from '../models/AssetModel';
import { prisma } from '../server';
import { validate } from '../utils/zodValidation';
import { assetSchema } from '../ schemas/assetSchema';

export default class AssetController {

  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const assets = [
      { id: 1, name: 'Ação XYZ', currentValue: 100.00 },
      { id: 2, name: 'Fundo ABC', currentValue: 200.00 },
      { id: 3, name: 'Criptomoeda BTC', currentValue: 50000.45 },
      { id: 4, name: 'Tesouro Direto IPCA+', currentValue: 1000.00 },
      { id: 5, name: 'ETF XPTO11', currentValue: 50 },
    ];

    reply.send(assets);
  }

  static async getAllByClient(
    req: FastifyRequest<{ Params: { clientId: string } }>,
    reply: FastifyReply
  ) {
    const clientId = Number(req.params.clientId);
    const assets = await AssetModel.getAllByClient(prisma, clientId);
    reply.send(assets);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(req.params.id);
    const asset = await AssetModel.getById(prisma, id);
    if (!asset) return reply.code(404).send({ message: 'Asset not found' });
    reply.send(asset);
  }

  static async create(req: FastifyRequest, reply: FastifyReply) {
   const params = validate(assetSchema, req.body, reply);
    if (!params) return;

    const { name, currentValue, clientId } = req.body as {
      name: string;
      currentValue: number;
      clientId: number;
    };

    const asset = await AssetModel.create(prisma, { name, currentValue, clientId });
    reply.code(201).send(asset);
  }

  static async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(req.params.id);
    const data = req.body as {
      name?: string;
      currentValue?: number;
    };

    const asset = await AssetModel.update(prisma, id, data);
    reply.send(asset);
  }

  static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(req.params.id);
    await AssetModel.delete(prisma, id);
    reply.code(204).send();
  }
}
