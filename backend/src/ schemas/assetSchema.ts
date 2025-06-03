import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(1, "Nome do ativo é obrigatório"),
  currentValue: z.coerce.number().positive("Valor deve ser positivo"),
  clientId: z.number().int().positive("ID do cliente inválido"),
});

export const assetUpdateSchema = z.object({
  id: z.number().int().positive("ID do ativo inválido"),
  name: z.string().min(1, "Nome do ativo é obrigatório").optional(),
  currentValue: z.coerce.number().positive("Valor deve ser positivo").optional(),
  clientId: z.number().int().positive("ID do cliente inválido").optional(),
});

export type AssetInput = z.infer<typeof assetSchema>;
