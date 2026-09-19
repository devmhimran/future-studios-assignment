import { Button } from '@/components/ui/button';
import { Meta } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  meta?: Meta;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  meta,
  onPageChange,
}: ProductPaginationProps) {
  return (
    meta &&
    meta.totalPages > 1 && (
      <div className='mt-10 flex items-center justify-center gap-3'>
        <Button
          aria-label='Previous page'
          className='rounded-xl'
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
          size='icon-lg'
          variant='outline'
        >
          <ChevronLeft />
        </Button>
        <span className='text-sm font-semibold text-slate-600'>
          Page {meta.page} of {meta.totalPages}
        </span>
        <Button
          aria-label='Next page'
          className='rounded-xl'
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPageChange(meta.page + 1)}
          size='icon-lg'
          variant='outline'
        >
          <ChevronRight />
        </Button>
      </div>
    )
  );
}
