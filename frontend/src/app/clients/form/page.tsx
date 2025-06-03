'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// 🔧 Schema alinhado com o backend
const clientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  status: z.enum(['ATIVO', 'INATIVO'], {
    errorMap: () => ({ message: 'Selecione o status' }),
  }),
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function ClientForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get('id');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: ClientFormData) => {
    try {
      if (clientId) {
        await api.put(`/clients/${clientId}`, data);
      } else {
        await api.post('/clients', data);
      }
      router.push('/clients');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  useEffect(() => {
    if (clientId) {
      api.get(`/clients/${clientId}`).then((res) => {
        reset(res.data);
      });
    }
  }, [clientId, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <Input placeholder="Nome" {...register('name')} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="E-mail" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Status</label>
        <Select
          onValueChange={(value: 'ATIVO' | 'INATIVO') =>
            setValue('status', value)
          }
          value={watch('status')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ATIVO">Ativo</SelectItem>
            <SelectItem value="INATIVO">Inativo</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
