// components/pokemon/PokemonFilter.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePokemonTypes } from '@/hooks/use-pokemon';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonFilterProps {
  initialValue?: string;
}

export default function PokemonFilter({ initialValue = '' }: PokemonFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState(initialValue);
  const { types, isLoading, isError } = usePokemonTypes();
  
  // Update state jika initialValue berubah
  useEffect(() => {
    setSelectedType(initialValue);
  }, [initialValue]);
  
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    
    // Buat URLSearchParams baru berdasarkan yang ada
    const params = new URLSearchParams(searchParams.toString());
    
    // Set parameter tipe atau hapus jika "semua"
    if (value && value !== 'semua') {
      params.set('type', value);
    } else {
      params.delete('type');
    }
    
    // Reset halaman ke 1 ketika mengubah filter
    params.set('page', '1');
    
    // Perbarui URL dengan parameter baru
    router.push(`/pokemon?${params.toString()}`);
  };
  
  if (isError) return <div>Error mengambil data tipe Pokemon</div>;
  
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="type-filter">Filter berdasarkan Tipe</Label>
      
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger id="type-filter">
            <SelectValue placeholder="Pilih tipe Pokemon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Tipe</SelectItem>
            {types.map((type: string) => (
              <SelectItem key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
