'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';

// 🧠 Schema do asset
const assetSchema = z.object({
  name: z.string().min(1, 'Nome do ativo é obrigatório'),
  currentValue: z.coerce.number().positive('Valor deve ser positivo'),
  clientId: z.number().int().positive('ID do cliente inválido'),
});

type AssetFormData = z.infer<typeof assetSchema>;

export default function AssetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientIdParam = searchParams.get('clientId');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      clientId: clientIdParam ? parseInt(clientIdParam) : undefined,
    },
  });

  const onSubmit = async (data: AssetFormData) => {
    try {
      await api.post('/assets', data);
      router.push(`/clients/assets?clientId=${data.clientId}`);
    } catch (error) {
      console.error('Erro ao salvar ativo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <Input placeholder="Nome do ativo" {...register('name')} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          type="number"
          step="0.01"
          placeholder="Valor atual (R$)"
          {...register('currentValue')}
        />
        {errors.currentValue && (
          <p className="text-red-500 text-sm">
            {errors.currentValue.message}
          </p>
        )}
      </div>

      <input
        type="hidden"
        value={clientIdParam ?? ''}
        {...register('clientId', { valueAsNumber: true })}
      />
      {errors.clientId && (
        <p className="text-red-500 text-sm">{errors.clientId.message}</p>
      )}

      <Button type="submit">Salvar Ativo</Button>
    </form>
  );
}
