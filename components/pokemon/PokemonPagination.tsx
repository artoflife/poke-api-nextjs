// components/pokemon/PokemonPagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PokemonPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function PokemonPagination({
  currentPage,
  totalPages,
}: PokemonPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/pokemon?${params.toString()}`;
  };

  // Menentukan halaman yang ditampilkan (maksimal 5)
  const getPageNumbers = () => {
    const totalVisible = 5; // total tombol halaman yang ditampilkan (termasuk awal & akhir)
    const pages: (number | "dots")[] = [];

    if (totalPages <= totalVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1); // halaman pertama

      if (left > 2) pages.push("dots");

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) pages.push("dots");

      pages.push(totalPages); // halaman terakhir
    }

    return pages;
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getPageNumbers().map((page, i) => (
          <PaginationItem key={i}>
            {page === "dots" ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
