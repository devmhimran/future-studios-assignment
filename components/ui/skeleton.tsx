import { cn } from 'cn';
import type { ComponentProps } from 'react';

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#004643]/10', className)}
      data-slot='skeleton'
      {...props}
    />
  );
}
