'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Button, Card, CardContent } from '@/components/ui/index';
import Link from 'next/link';

type Client = {
  id: number;
  name: string;
  email: string;
};

export default function ClientsPage() {
  const { data, isLoading } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await api.get('/clients');
      return res.data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Clientes</h1>
        <Button asChild>
          <Link href="/clients/form">Novo Cliente</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {data?.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{client.name}</h2>
                <p className="text-sm">{client.email}</p>
              </div>
              <Button asChild variant="outline">
                <Link href={`/clients/form?id=${client.id}`}>Editar</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
