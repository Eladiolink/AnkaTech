'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Card, CardContent } from '@/components/ui/index';

type Asset = {
    id: number;
    name: string;
    currentValue: number;
};

export default function AssetsPage() {
    const { data, isLoading } = useQuery<Asset[]>({
        queryKey: ['static-assets'],
        queryFn: async () => {
            const res = await api.get('/assets');
            console.log(res.data)
            return res.data;
        },
    });

    if (isLoading) return <p>Carregando...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Ativos Financeiros</h1>

            <div className="grid gap-4">
                {data?.map((asset) => (
                    <Card key={asset.id}>
                        <CardContent className="p-4">
                            <h2 className="font-semibold">{asset.name}</h2>
                            <p className="text-sm">Valor atual: R$ {asset.currentValue}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}