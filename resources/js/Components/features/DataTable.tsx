import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/Table';
import { Pagination } from '../ui/Pagination';
import { SkeletonTable } from '../ui/Skeleton';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

export interface Column<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  pagination,
  onRowClick,
  className,
}: DataTableProps<T>) {
  if (loading) {
    return <SkeletonTable rows={pagination?.totalPages ? 5 : data.length || 5} />;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium">{emptyMessage}</p>
          <p className="text-sm">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(onRowClick && 'cursor-pointer')}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.cell
                      ? column.cell(row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
