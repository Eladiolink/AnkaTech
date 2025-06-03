import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Bem-vindo ao Ativos App
        </h1>
        <p className="text-gray-600">
          Gerencie seus clientes e ativos de forma fácil e rápida.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/clients"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Ir para Clientes
          </Link>
          <Link
            href="/assets"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Ir para Ativos
          </Link>
        </div>
      </div>
    </div>
  );
}
