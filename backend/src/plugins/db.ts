import fp from 'fastify-plugin';
import mysql from 'mysql2/promise';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  const connection = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  fastify.decorate('mysql', connection);
});

declare module 'fastify' {
  interface FastifyInstance {
    mysql: mysql.Pool;
  }
}
