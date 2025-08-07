// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Pokedex App dengan Next.js dan TypeScript
        </h1>
        
        <p className="text-xl mb-8 max-w-3xl">
          Aplikasi untuk menjelajahi Pokemon dengan fitur pencarian, filter, dan 
          pengurutan menggunakan Next.js 15, TypeScript, SWR, dan shadcn/ui
        </p>
        
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/pokemon">Lihat Pokemon</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
              Tentang PokeAPI
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
