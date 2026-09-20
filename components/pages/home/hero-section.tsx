import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onBrowseCategories: () => void;
}

export function HeroSection({ onBrowseCategories }: HeroSectionProps) {
  return (
    <section className='relative overflow-hidden bg-white text-[#111827] p-0'>
      <div className='absolute bottom-6 left-1/4 size-64 rounded-full bg-[#EFECE6]/80 blur-3xl z-0' />
      <div className='absolute top-10 right-12 size-40 rounded-full border border-neutral-300/40 bg-white/40 z-0' />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid items-center gap-4 lg:grid-cols-12 lg:gap-12'>
          <div className='flex flex-col items-start lg:col-span-6 w-full py-8 lg:py-56'>
            <h1 className='mt-5 max-w-md text-5xl font-medium leading-[.96] tracking-[-0.065em] text-[#004643] sm:text-6xl lg:text-7xl'>
              Redefining <br />
              Everyday Tech
            </h1>

            <p className='mt-6 w-full text-base leading-relaxed text-neutral-600 sm:text-lg'>
              Experience next-level comfort, design, and innovation with
              Veluno&apos;s modern electronics—made to elevate your lifestyle.
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-4 w-full'>
              <Link href='/shops'>
                <Button className='h-11 rounded-full bg-[#004643] px-5 text-white hover:bg-[#003d3a]'>
                  Shop now <ArrowRight className='size-4' />
                </Button>
              </Link>
              <Button
                className='h-11 rounded-full border-[#004643]/30 px-5 text-[#004643] hover:bg-[#004643]/10'
                onClick={onBrowseCategories}
                variant='outline'
              >
                Explore categories
              </Button>
            </div>

            <div className='mt-12 flex items-center gap-4 w-full'>
              <div className='flex -space-x-2.5'>
                <Image
                  src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                  alt='Customer'
                  width={40}
                  height={40}
                  className='size-10 rounded-full border-2 border-[#FAF8F5] object-cover shadow-sm'
                />
                <Image
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
                  alt='Customer'
                  width={40}
                  height={40}
                  className='size-10 rounded-full border-2 border-[#FAF8F5] object-cover shadow-sm'
                />
                <Image
                  src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
                  alt='Customer'
                  width={40}
                  height={40}
                  className='size-10 rounded-full border-2 border-[#FAF8F5] object-cover shadow-sm'
                />
                <Image
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
                  alt='Customer'
                  width={40}
                  height={40}
                  className='size-10 rounded-full border-2 border-[#FAF8F5] object-cover shadow-sm'
                />
              </div>

              <div className='flex flex-col text-left'>
                <span className='text-sm font-extrabold text-[#F43F5E] leading-none'>
                  19K+
                </span>
                <span className='text-xs font-semibold text-neutral-800 tracking-tight mt-0.5'>
                  Reviews
                </span>
              </div>
            </div>
          </div>

          <div className='relative lg:col-span-6 w-full h-full min-h-[450px] lg:min-h-[580px] flex items-end justify-center'>
            <div className='absolute inset-x-0 bottom-0 top-6 rounded-t-full bg-[#F2EFE9] -z-10' />

            <div className='relative w-full h-full min-h-[450px] lg:min-h-[580px]'>
              <Image
                src='/hero-img.png'
                alt='Redefining Everyday Tech'
                fill
                priority
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover object-bottom'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
