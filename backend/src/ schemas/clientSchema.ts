import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.enum(['ATIVO', 'INATIVO']).optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
