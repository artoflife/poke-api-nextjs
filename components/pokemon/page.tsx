// app/pokemon/page.tsx
import { Suspense } from "react";
import PokemonList from "@/components/pokemon/PokemonList";
import PokemonSearch from "@/components/pokemon/PokemonSearch";
import PokemonFilter from "@/components/pokemon/PokemonFilter";
import PokemonSort from "@/components/pokemon/PokemonSort";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Next.js 15 menggunakan props untuk mengakses searchParams
export default function PokemonPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Ekstrak parameter dari URL
  const search = searchParams.search as string | undefined;
  const type = searchParams.type as string | undefined;
  const sort = searchParams.sort as string | undefined;
  const order = searchParams.order as string | undefined;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 20;

  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Daftar Pokemon</h1>

      <div className="space-y-6 mb-8">
        <PokemonSearch initialValue={search} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PokemonFilter initialValue={type} />
          <PokemonSort initialSort={sort} initialOrder={order} />
        </div>
      </div>

      <Separator className="my-6" />

      <Suspense
        fallback={
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
        }
      >
        <PokemonList
          search={search}
          type={type}
          sort={sort as "name" | "id"}
          order={order as "asc" | "desc"}
          page={page}
          limit={limit}
        />
      </Suspense>
    </main>
  );
}
