import { Button } from '@/components/ui/button';
import type { Meta } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopPaginationProps {
  meta?: Meta;
  onPageChange: (page: number) => void;
}

export function ShopPagination({ meta, onPageChange }: ShopPaginationProps) {
  if (!meta || meta.totalPages <= 1) return null;

  return (
    <div className='mt-10 flex items-center justify-center gap-3'>
      <Button
        aria-label='Previous page'
        disabled={meta.page <= 1}
        onClick={() => onPageChange(meta.page - 1)}
        size='icon'
        variant='outline'
      >
        <ChevronLeft />
      </Button>
      <span className='text-sm text-[#004643]/70'>
        Page {meta.page} of {meta.totalPages}
      </span>
      <Button
        aria-label='Next page'
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPageChange(meta.page + 1)}
        size='icon'
        variant='outline'
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
