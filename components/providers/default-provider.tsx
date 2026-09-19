'use client';

import { getQueryClient } from '@/lib';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '../ui/tooltip';

const queryClient = getQueryClient();

export function DefaultProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
          <Toaster position='top-right' richColors />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}
