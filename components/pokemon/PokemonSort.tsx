// components/pokemon/PokemonSort.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface PokemonSortProps {
  initialSort?: string;
  initialOrder?: string;
}

export default function PokemonSort({ 
  initialSort = 'id', 
  initialOrder = 'asc' 
}: PokemonSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState(initialOrder);
  
  // Update state jika initialSort atau initialOrder berubah
  useEffect(() => {
    setSort(initialSort);
    setOrder(initialOrder);
  }, [initialSort, initialOrder]);
  
  const handleSortChange = (value: string) => {
    setSort(value);
    updateUrl(value, order);
  };
  
  const handleOrderChange = (value: string) => {
    setOrder(value);
    updateUrl(sort, value);
  };
  
  const updateUrl = (sortValue: string, orderValue: string) => {
    // Buat URLSearchParams baru berdasarkan yang ada
    const params = new URLSearchParams(searchParams.toString());
    
    // Set parameter sort dan order
    params.set('sort', sortValue);
    params.set('order', orderValue);
    
    // Reset halaman ke 1 ketika mengubah pengurutan
    params.set('page', '1');
    
    // Perbarui URL dengan parameter baru
    router.push(`/pokemon?${params.toString()}`);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="space-y-2 w-full max-w-xs">
        <Label htmlFor="sort-by">Urutkan berdasarkan</Label>
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger id="sort-by">
            <SelectValue placeholder="Pilih urutan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="name">Nama</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 w-full max-w-xs">
        <Label htmlFor="sort-order">Urutan</Label>
        <Select value={order} onValueChange={handleOrderChange}>
          <SelectTrigger id="sort-order">
            <SelectValue placeholder="Pilih arah urutan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Naik (A-Z)</SelectItem>
            <SelectItem value="desc">Turun (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
