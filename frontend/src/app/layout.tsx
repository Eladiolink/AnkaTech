import './globals.css';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/providers/react-query-provider';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ativos App',
  description: 'Gerenciamento de Clientes e Ativos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1">
              <div className="max-w-7xl mx-auto px-6 py-8">
                {children}
              </div>
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
