// hooks/use-pokemon.ts
import useSWR from 'swr';
import { Pokemon, PokemonListResponse, PokemonQueryParams } from '@/types/pokemon';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePokemonList(params: PokemonQueryParams = {}) {
  const { page = 1, limit = 20, search, type } = params;
  const offset = (page - 1) * limit;
  
  // Buat URL untuk fetch data
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  
  // Gunakan SWR untuk fetching data
  const { data, error, isLoading, mutate } = useSWR<PokemonListResponse>(
    url,
    fetcher
  );
  
  // Filter data jika ada parameter search
  let filteredResults = data?.results;
  
  if (search && filteredResults) {
    filteredResults = filteredResults.filter(pokemon => 
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return {
    pokemonList: {
      ...data,
      results: filteredResults || []
    },
    isLoading,
    isError: error,
    mutate
  };
}

export function usePokemon(name: string) {
  const { data, error, isLoading } = useSWR<Pokemon>(
    name ? `https://pokeapi.co/api/v2/pokemon/${name}` : null,
    fetcher
  );
  
  return {
    pokemon: data,
    isLoading,
    isError: error
  };
}

export function usePokemonTypes() {
  const { data, error, isLoading } = useSWR(
    'https://pokeapi.co/api/v2/type',
    fetcher
  );
  
  return {
    types: data?.results || [],
    isLoading,
    isError: error
  };
}
