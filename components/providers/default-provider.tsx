'use client';

import { getQueryClient } from '@/lib';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '../ui/tooltip';
import { Navbar } from '../shared';

const queryClient = getQueryClient();

export function DefaultProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Navbar />
          {children}
          <Toaster position='top-right' richColors />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}
