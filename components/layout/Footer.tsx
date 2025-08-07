export default function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} PokéApp - Dibuat dengan ❤️, Next.js, 
          TypeScript, dan shadcn/ui
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Data dari <a href="https://pokeapi.co/" className="underline hover:text-blue-600" target="_blank" rel="noopener noreferrer">PokéAPI</a>
        </p>
      </div>
    </footer>
  );
}