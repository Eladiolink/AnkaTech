'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Button, Card, CardContent } from '@/components/ui/index';
import Link from 'next/link';

type Asset = {
    id: number;
    name: string;
    currentValue: number;
};

type Client = {
    id: number;
    name: string;
    assets: Asset[];
};

export default function AssetsPage() {
    const searchParams = useSearchParams();
    const clientId = searchParams.get('clientId');

    const { data, isLoading, error } = useQuery<Client>({
        queryKey: ['client-assets', clientId],
        enabled: !!clientId,
        queryFn: async () => {
            const res = await api.get(`/clients/${clientId}`);
            return res.data;
        },
    });

    if (!clientId) {
        return <p>Cliente não informado na URL.</p>;
    }

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os ativos.</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4 items-center">
                <h1 className="text-xl font-bold">
                    Ativos do Cliente {data?.name}
                </h1>

                <Button asChild>
                    <Link href={`/clients/assets/add?clientId=${clientId}`}>
                        Adicionar Ativo
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {data?.assets?.map((asset) => (
                    <Card key={asset.id}>
                        <CardContent className="p-4">
                            <h2 className="font-semibold">{asset.name}</h2>
                            <p className="text-sm">
                                Valor atual: R$ {asset.currentValue}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
