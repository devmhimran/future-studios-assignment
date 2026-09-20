'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center px-4 text-center'>
      <span className='grid size-20 place-items-center rounded-full bg-destructive/10 text-3xl font-extrabold text-destructive'>
        !
      </span>
      <h1 className='mt-8 text-4xl font-extrabold tracking-tight text-foreground'>
        Something went wrong
      </h1>
      <p className='mt-4 max-w-sm text-lg text-muted-foreground'>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <Button
        className='mt-8 rounded-full bg-[#004643] text-[#EFECE6] hover:bg-[#004643]/80'
        onClick={reset}
        size='lg'
      >
        Try again
      </Button>
    </div>
  );
}
