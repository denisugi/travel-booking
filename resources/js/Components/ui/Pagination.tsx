import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    };

    const paginationRange = React.useMemo(() => {
      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        const leftRange = range(1, 3 + siblingCount);
        return [...leftRange, '...', totalPages];
      }

      if (showLeftDots && !showRightDots) {
        const rightRange = range(totalPages - (2 + siblingCount), totalPages);
        return [1, '...', ...rightRange];
      }

      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', totalPages];
    }, [currentPage, totalPages, siblingCount]);

    return (
      <nav ref={ref} className={cn('flex items-center justify-center gap-1', className)} {...props}>
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span key={`dots-${index}`} className="px-3 text-muted-foreground">
                ...
              </span>
            );
          }

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
