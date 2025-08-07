// components/pokemon/PokemonList.tsx
"use client";

import { usePokemonList } from "@/hooks/use-pokemon";
import PokemonCard from "./PokemonCard";
import PokemonPagination from "./PokemonPagination";
import { useState, useEffect, useMemo } from "react";
import { PokemonQueryParams } from "@/types/pokemon";
import { Skeleton } from "@/components/ui/skeleton";

interface PokemonListProps {
  search?: string;
  type?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export default function PokemonList({
  search,
  type,
  sort = "id",
  order = "asc",
  page = 1,
  limit = 20,
}: PokemonListProps) {
  const queryParams: PokemonQueryParams = {
    search,
    type,
    sort: sort as "name" | "id",
    order: order as "asc" | "desc",
    page,
    limit,
  };

  const { pokemonList, isLoading, isError } = usePokemonList(queryParams);
  console.log(pokemonList);
  
  const filteredPokemon = useMemo(() => {
    if (!pokemonList?.results) return [];
    let results = [...pokemonList.results];
    if (search) {
      results = results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    results.sort((a, b) => {
      const idA = parseInt(a.url.split("/").filter(Boolean).pop() || "0");
      const idB = parseInt(b.url.split("/").filter(Boolean).pop() || "0");
      if (sort === "name") {
        return order === "asc"
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
      } else {
        return order === "asc" ? idA - idB : idB - idA;
      }
    })
    return results;
  }, [pokemonList?.results, search, sort, order]);

  if (isError)
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Error mengambil data Pokemon</p>
      </div>
    );

  // Skeleton loader untuk menunjukkan loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <Skeleton className="h-40 w-full rounded-t-lg" />
              <Skeleton className="h-16 w-full rounded-b-lg mt-1" />
            </div>
          ))}
      </div>
    );
  }

  if (!pokemonList || filteredPokemon.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border">
        <p className="text-gray-600">Tidak ada Pokemon yang ditemukan</p>
      </div>
    );
  }

  const totalPages = Math.ceil((pokemonList?.count ?? 0) / limit);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>

      <PokemonPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
