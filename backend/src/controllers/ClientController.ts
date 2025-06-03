import { FastifyRequest, FastifyReply } from 'fastify';
import ClientModel from '../models/ClientModel';
import { prisma } from '../server';
import { ClientStatus } from '../enums';
import { validate } from '../utils/zodValidation';
import { clientSchema, clientUpdateSchema } from '../ schemas/clientSchema';

export default class ClientController {
  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const clients = await ClientModel.getAll(prisma);
    reply.send(clients);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(req.params.id);
    const client = await ClientModel.getById(prisma, id);
    if (!client) return reply.code(404).send({ message: 'Client not found' });
    reply.send(client);
  }

  static async create(req: FastifyRequest, reply: FastifyReply) {
    const params = validate(clientSchema, req.body, reply);
    if (!params) return;

    const { name, email, status } = req.body as {
      name: string;
      email: string;
      status?: ClientStatus;
    };

    const client = await ClientModel.create(prisma, { name, email, status });
    reply.code(201).send(client);
  }

  static async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const params = validate(clientUpdateSchema, req.body, reply);
    if (!params) return;

    const id = Number(req.params.id);
    const data = req.body as {
      name?: string;
      email?: string;
      status?: ClientStatus;
    };

    const client = await ClientModel.update(prisma, id, data);
    reply.send(client);
  }

  static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(req.params.id);
    await ClientModel.delete(prisma, id);
    reply.code(204).send();
  }
}
