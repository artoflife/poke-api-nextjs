// components/pokemon/PokemonSearch.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface PokemonSearchProps {
  initialValue?: string;
}

export default function PokemonSearch({ initialValue = '' }: PokemonSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue);
  
  // Update state jika initialValue berubah
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buat URLSearchParams baru berdasarkan yang ada
    const params = new URLSearchParams(searchParams.toString());
    
    // Set parameter pencarian atau hapus jika kosong
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    
    // Reset halaman ke 1 ketika melakukan pencarian
    params.set('page', '1');
    
    // Perbarui URL dengan parameter baru
    router.push(`/pokemon?${params.toString()}`);
  };
  
  return (
    <form onSubmit={handleSearch} className="flex w-full gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari Pokemon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button type="submit">
        Cari
      </Button>
    </form>
  );
}
