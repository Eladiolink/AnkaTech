'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/clients', label: 'Clientes' },
  { href: '/assets', label: 'Ativos' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        <Link href="/" className="hover:text-gray-300">
          Ativos App
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded transition ${
                    isActive ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Ativos App
      </div>
    </aside>
  );
}