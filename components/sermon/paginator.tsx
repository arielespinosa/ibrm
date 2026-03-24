import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



export interface PaginatorPageProps {
  value: number; 
  isActive: boolean;
}

export interface PaginatorProps  {
  pages: PaginatorPageProps[];
  setPage: (value: number) => void;
}

export function SermonPaginator({pages, setPage}: PaginatorProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="text-white/40 hover:bg-[#c9a55a]"/>
        </PaginationItem>
        {pages.map(item => (
          <PaginationItem key={item.value}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage(item.value)
              }}
              className={`rounded-none ${
                item.isActive
                  ? "bg-[#c9a55a] text-black border border-white/10 hover:bg-[#c9a55a]"
                  : "text-white/40 hover:text-[#c9a55a] hover:bg-transparent"
              }`}
              isActive={item.isActive}
            >
              {item.value}
            </PaginationLink>
            </PaginationItem>
        ))}        
        <PaginationItem>
          <PaginationNext href="#"  className="text-white/40 hover:bg-[#c9a55a]"/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
