import { FastifyInstance } from 'fastify';
import AssetController from '../controllers/AssetController';

export async function assetRoutes(server: FastifyInstance) {
  server.get('/clients/:clientId/assets', AssetController.getAllByClient);
 
  server.get('/assets', AssetController.getAll);
  server.get('/assets/:id', AssetController.getById);
  server.post('/assets', AssetController.create);
  server.put('/assets/:id', AssetController.update);
  server.delete('/assets/:id', AssetController.delete);
}
