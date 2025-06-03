import { FastifyInstance } from 'fastify';
import ClientController from '../controllers/ClientController';

export async function clientRoutes(server: FastifyInstance) {
  server.get('/clients', ClientController.getAll);
  server.get('/clients/:id', ClientController.getById);
  server.post('/clients', ClientController.create);
  server.put('/clients/:id', ClientController.update);
  server.delete('/clients/:id', ClientController.delete);
}
