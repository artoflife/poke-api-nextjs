// components/layout/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">PokéApp</Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/pokemon" className="hover:text-blue-600 transition-colors">
                Pokemon
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// components/layout/Footer.tsx

// app/layout.tsx