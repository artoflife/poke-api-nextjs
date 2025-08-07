// components/pokemon/PokemonCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { 
  Card, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  // Ekstrak ID dari URL
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  
  return (
    <Link href={`/pokemon/${name}`} className="block">
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
        <div className="relative w-full aspect-square bg-gray-50">
          <Image 
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
            priority={false}
            className="p-4"
          />
        </div>
        <CardFooter className="flex flex-col items-center p-4">
          <Badge variant="outline" className="mb-1">#{id}</Badge>
          <h3 className="capitalize font-medium text-lg">{name.replace(/-/g, ' ')}</h3>
        </CardFooter>
      </Card>
    </Link>
  );
}
