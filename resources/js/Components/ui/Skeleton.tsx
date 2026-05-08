import * as React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
};

const SkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-48 w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="flex justify-between">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-20" />
    </div>
  </div>
);

const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);

export { Skeleton, SkeletonCard, SkeletonTable };
