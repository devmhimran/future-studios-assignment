import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onBrowseCategories: () => void;
  onShop: () => void;
}

export function HeroSection({ onBrowseCategories, onShop }: HeroSectionProps) {
  return (
    <section className='container mx-auto pb-16'>
      <div className='relative isolate overflow-hidden border-b border-[#004643]/15 bg-[#F0EEDE5]'>
        <div className='grid min-h-145 lg:grid-cols-[.92fr_1.08fr] lg:items-center'>
          <div className='relative px-7 py-14 sm:px-12 lg:py-20 lg:pl-14'>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-[#004643]/60'>
              The future store
            </p>
            <h1 className='mt-5 max-w-md text-5xl font-medium leading-[.96] tracking-[-0.065em] text-[#004643] sm:text-6xl lg:text-7xl'>
              Redefining everyday finds.
            </h1>
            <p className='mt-6 max-w-sm text-sm leading-6 text-[#004643]/75 sm:text-base'>
              Discover considered essentials, standout tech, and little upgrades
              selected to make everyday life feel more yours.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Button
                className='h-11 rounded-full bg-[#004643] px-5 text-white hover:bg-[#003d3a]'
                onClick={onShop}
              >
                Shop now <ArrowRight className='size-4' />
              </Button>
              <Button
                className='h-11 rounded-full border-[#004643]/30 px-5 text-[#004643] hover:bg-[#004643]/10'
                onClick={onBrowseCategories}
                variant='outline'
              >
                Explore categories
              </Button>
            </div>
            <div className='mt-12 flex items-center gap-3'>
              <div className='flex -space-x-2'>
                {['M', 'J', 'R'].map((initial, index) => (
                  <span
                    className={
                      'grid size-9 place-items-center rounded-full border-2 border-white text-xs font-bold text-white ' +
                      (index === 0
                        ? 'bg-[#9b7f6f]'
                        : index === 1
                          ? 'bg-[#355c7d]'
                          : 'bg-[#c06c84]')
                    }
                    key={initial}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <p className='text-xs leading-4 text-[#004643]/65'>
                <span className='font-bold text-[#004643]'>19K+</span> people
                are discovering their next favorite.
              </p>
            </div>
          </div>
          <div className='relative min-h-95 overflow-hidden lg:min-h-full'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_52%_36%,#F0EEDE_0%,#d9dfcf_48%,#8db5aa_100%)]' />
            <div className='absolute -right-12 top-10 size-32 rounded-full border border-white/75 bg-white/25' />
            <div className='absolute bottom-14 left-10 size-12 rounded-full border border-slate-300 bg-white/35' />
            <Image
              width={200}
              height={200}
              alt='Cream over-ear headphones'
              className='absolute bottom-0 left-1/2 h-[108%] w-full max-w-xl -translate-x-1/2 object-cover object-center mix-blend-multiply'
              src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
