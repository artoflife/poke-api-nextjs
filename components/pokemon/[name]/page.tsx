// app/pokemon/[name]/page.tsx
import { Suspense } from 'react';
import PokemonDetail from '@/components/pokemon/PokemonDetail';
import Link from 'next/link';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const headersList = await headers();
  const referer = headersList.get('referer') || '/pokemon';
  
  return (
    <main className="container mx-auto py-6 px-4">
      <Button asChild variant="outline" className="mb-6">
        <Link href={referer}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar
        </Link>
      </Button>
      
      <Suspense fallback={
        <div className="w-full h-[600px] rounded-lg">
          <Skeleton className="w-full h-full" />
        </div>
      }>
        <PokemonDetail name={params.name} />
      </Suspense>
    </main>
  );
}
