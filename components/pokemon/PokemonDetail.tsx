// components/pokemon/PokemonDetail.tsx
'use client';

import { usePokemon } from '@/hooks/use-pokemon';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

// Warna untuk tipe Pokemon
const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

interface PokemonDetailProps {
  name: string;
}

export default function PokemonDetail({ name }: PokemonDetailProps) {
  const { pokemon, isLoading, isError } = usePokemon(name);
  
  if (isLoading) return <PokemonDetailSkeleton />;
  
  if (isError) return (
    <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
      <p className="text-red-600">Error mengambil data Pokemon</p>
    </div>
  );
  
  if (!pokemon) return null;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 pb-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold capitalize">{pokemon.name.replace(/-/g, ' ')}</h1>
          <Badge variant="outline" className="text-lg px-3 py-1">#{pokemon.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gray-50 p-6">
            <div className="relative w-full aspect-square">
              <Image 
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Tipe</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map(({ type }) => (
                  <Badge 
                    key={type.name}
                    className={`capitalize ${typeColors[type.name] || 'bg-gray-500'} hover:${typeColors[type.name] || 'bg-gray-600'}`}
                  >
                    {type.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-1">
                <h3 className="font-semibold">Tinggi</h3>
                <p>{pokemon.height / 10} m</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Berat</h3>
                <p>{pokemon.weight / 10} kg</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-1">Kemampuan</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <Badge 
                      key={ability.name} 
                      variant={is_hidden ? "outline" : "default"}
                      className="capitalize"
                    >
                      {ability.name.replace(/-/g, ' ')}
                      {is_hidden && " (Tersembunyi)"}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Statistik Dasar</h2>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium">
                        {stat.stat.name.replace(/-/g, ' ')}
                      </span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <Progress value={(stat.base_stat / 255) * 100} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PokemonDetailSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="mt-6">
              <Skeleton className="h-8 w-24 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-8" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
