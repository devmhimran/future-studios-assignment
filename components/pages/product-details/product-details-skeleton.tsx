import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailsSkeleton() {
  return (
    <main className='min-h-screen bg-[#F0EEDE]'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div className='space-y-4'>
            <Skeleton className='aspect-square w-full rounded-sm' />
            <div className='flex gap-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton className='size-20 rounded-sm' key={i} />
              ))}
            </div>
          </div>
          <div className='space-y-6'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6 w-28' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
            <div className='flex gap-3 pt-4'>
              <Skeleton className='h-12 w-32 rounded-lg' />
              <Skeleton className='h-12 flex-1 rounded-lg' />
            </div>
          </div>
        </div>
        <div className='mt-16 space-y-6'>
          <Skeleton className='h-8 w-48' />
          <div className='flex gap-4 overflow-hidden'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton className='h-64 w-56 shrink-0 rounded-sm' key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
