import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TablePaginationProps {
  count: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  rowsPerPageOptions?: number[]
  showRowsPerPage?: boolean
  className?: string
}

export function TablePagination({
  count,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
  showRowsPerPage = true,
  className,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(count / pageSize))
  const from = count === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, count)

  return (
    <div className={cn("px-4 py-3 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className="text-sm text-muted-foreground">
          Mostrando {from} - {to} de {count}
        </span>
        {onPageSizeChange && showRowsPerPage && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Filas por página</span>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger size="sm" className="w-20">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent side="top">
                {rowsPerPageOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
        >
          <span className="sr-only">Primera página</span>
          <span aria-hidden>«</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          <span className="sr-only">Página anterior</span>
          <span aria-hidden>‹</span>
        </Button>
        <span className="text-sm text-muted-foreground">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          <span className="sr-only">Página siguiente</span>
          <span aria-hidden>›</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
        >
          <span className="sr-only">Última página</span>
          <span aria-hidden>»</span>
        </Button>
      </div>
    </div>
  )
}
