import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { clientRoutes } from './routes/ clientRoutes';
import { assetRoutes } from './routes/ assetRoutes';

export const prisma = new PrismaClient();

const server = Fastify({ logger: true });

server.register(fastifyCors, {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})
server.register(clientRoutes);
server.register(assetRoutes);

const start = async () => {
  try {
    await server.listen({ port: 5000, host: '0.0.0.0' });
    console.log('🚀 Server running at http://localhost:5000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
