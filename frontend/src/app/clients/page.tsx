'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Button, Card, CardContent } from '@/components/ui/index';
import Link from 'next/link';

type Client = {
  id: number;
  name: string;
  email: string;
  status: 'ATIVO' | 'INATIVO';
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
        {data?.map((client) => {
          const isInactive = client.status === 'INATIVO';

          return (
            <Card
              key={client.id}
              className={`
    ${isInactive ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted hover:shadow-md cursor-pointer'}
  `}
              onClick={() => {
                if (isInactive) return;
                const link = document.getElementById(`link-client-${client.id}`);
                link?.click();
              }}
            >
              <CardContent className="flex items-center justify-between h-20">
                <Link
                  id={`link-client-${client.id}`}
                  href={isInactive ? '#' : `/clients/assets?clientId=${client.id}`}
                  className="flex-1 flex h-full"
                  tabIndex={isInactive ? -1 : 0}
                  aria-disabled={isInactive}
                  onClick={(e) => {
                    if (isInactive) {
                      e.preventDefault();
                    }
                    e.stopPropagation(); // <-- impede que clique no link propague para o card
                  }}
                >
                  <div className="flex flex-col justify-center w-full">
                    <h2 className="font-semibold">{client.name}</h2>
                    <p className="text-sm">{client.email}</p>
                  </div>
                </Link>

                <div className="flex items-center">
                  <Button
                    asChild
                    variant="outline"
                    disabled={isInactive}
                    onClick={(e) => e.stopPropagation()} // <-- impede que clique no botão propague para o card
                  >
                    <Link href={`/clients/form?id=${client.id}`}>Editar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
