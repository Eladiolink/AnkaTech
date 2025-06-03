import { FastifyReply } from 'fastify';
import { ZodSchema, z } from 'zod';

export function validate<T extends ZodSchema>(
  schema: T,
  data: unknown,
  reply: FastifyReply
): z.infer<T> | void {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    reply.status(400).send({
      error: 'Validation Error',
      details: parsed.error.flatten(),
    });
    return;
  }

  return parsed.data;
}
