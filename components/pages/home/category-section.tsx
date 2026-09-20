import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';
import Link from 'next/link';

interface CategorySectionProps {
  categories: Category[];
  onCategorySelect: (category: string) => void;
}

export function CategorySection({
  categories,
  onCategorySelect,
}: CategorySectionProps) {
  return (
    <section
      id='discover'
      className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'
    >
      <div className='flex items-end justify-between gap-4'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.18em] text-[#004643]/65'>
            Curated collections
          </p>
          <h2 className='mt-2 text-3xl font-medium tracking-tight text-[#004643] sm:text-4xl'>
            Shop by category
          </h2>
        </div>
        <button
          className='hidden text-sm font-bold text-[#004643] underline-offset-4 hover:underline sm:block'
          onClick={() => onCategorySelect('')}
        >
          View all
        </button>
      </div>
      <div className='mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
        {categories.map((category) => (
          <Link
            href={`/shops?category=${category.slug}`}
            className='group flex min-h-32 flex-col justify-between rounded-sm border border-[#004643]/20 bg-[#f7f7ed] p-5 text-left text-[#004643] transition hover:border-[#004643] hover:bg-[#004643] hover:text-[#F0EEDE]'
            key={category.id}
          >
            <span className='text-sm font-semibold'>{category.name}</span>
            <ArrowRight className='size-5 transition group-hover:translate-x-1' />
          </Link>
        ))}
      </div>
    </section>
  );
}
