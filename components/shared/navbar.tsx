'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useGetCategories } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { CartSheet } from './cart-sheet';

export function Navbar() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const { fetchAllCategoriesData, fetchAllCategories } = useGetCategories();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className='sticky top-0 z-40 bg-[#004643]/90 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link
          className='flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#F0EEDE]'
          href='/'
        >
          <span className='grid size-9 place-items-center rounded-full bg-[#004643] text-sm text-[#F0EEDE]'>
            FS
          </span>
          future<span className='text-[#F0EEDE]/55'>.</span>
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          <Link
            className='rounded-lg px-3 py-2 text-sm font-medium text-[#F0EEDE]  hover:bg-[#F0EEDE]/20 hover:text-[#F0EEDE]'
            href='/shops'
          >
            Shops
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              openOnHover
              render={
                <Button
                  className='gap-1 text-[#F0EEDE] hover:bg-[#F0EEDE]/20 hover:text-[#F0EEDE]'
                  variant='ghost'
                />
              }
            >
              Categories <ChevronDown className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-72 border border-[#004643]/15 bg-[#F0EEDE] p-2 text-[#004643] shadow-xl'
              sideOffset={10}
            >
              {/* <DropdownMenuGroup>
                <DropdownMenuLabel className='px-2 py-2 text-xs uppercase tracking-[0.16em] text-[#004643]/55'>
                  Browse by category
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className='px-2.5 py-2 font-semibold focus:bg-[#004643] focus:text-[#F0EEDE]'
                  onClick={() => selectCategory('')}
                >
                  All categories
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className='bg-[#004643]/15' /> */}
              <DropdownMenuGroup className='grid grid-cols-2 gap-1'>
                {fetchAllCategoriesData?.data?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/shops?category=${category.slug}`}
                  >
                    <DropdownMenuItem
                      className={
                        activeCategory === category.slug
                          ? 'bg-[#004643] px-2.5 py-2 text-[#F0EEDE] focus:bg-[#004643] focus:text-[#F0EEDE]'
                          : 'px-2.5 py-2 focus:bg-[#004643]/10 focus:text-[#004643]'
                      }
                    >
                      {category.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className='flex items-center gap-2'>
          <Button
            className='hidden rounded-full bg-[#004643] px-4 text-white hover:bg-[#003d3a] sm:inline-flex'
            size='lg'
          >
            Sign in
          </Button>
          <CartSheet />
          <Button
            aria-label='Toggle navigation menu'
            className='rounded-xl md:hidden bg-[#004643] text-[#F0EEDE]'
            onClick={() => setMenuOpen((open) => !open)}
            size='icon-lg'
            variant='ghost'
          >
            {menuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <div className='max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#F0EEDE]/15 bg-[#004643] px-4 py-4 md:hidden'>
          <div className='mx-auto grid max-w-7xl gap-2'>
            <Link
              className='rounded-xl px-3 py-2 font-medium text-[#F0EEDE] hover:bg-[#F0EEDE]/10'
              href='/shops'
              onClick={() => setMenuOpen(false)}
            >
              Shops
            </Link>
            <Link
              className='rounded-xl px-3 py-2 font-medium text-[#F0EEDE] hover:bg-[#F0EEDE]/10'
              href='#discover'
              onClick={() => setMenuOpen(false)}
            >
              Discover
            </Link>
            <Button
              aria-expanded={categoriesOpen}
              className='mt-2 w-full justify-between rounded-xl bg-[#F0EEDE]/10 px-3 text-[#F0EEDE] hover:bg-[#F0EEDE]/20 hover:text-[#F0EEDE]'
              onClick={() => setCategoriesOpen((open) => !open)}
              variant='ghost'
            >
              Categories
              <ChevronDown
                className={`size-4 transition ${categoriesOpen ? 'rotate-180' : ''}`}
              />
            </Button>
            {categoriesOpen && (
              <div className='mt-2 grid gap-2'>
                <button
                  className={
                    'rounded-xl px-3 py-2 text-left text-sm font-medium ' +
                    (!activeCategory
                      ? 'bg-[#F0EEDE] text-[#004643]'
                      : 'bg-[#F0EEDE]/10 text-[#F0EEDE]')
                  }
                  onClick={() => setCategoriesOpen(false)}
                >
                  All categories
                </button>
                {fetchAllCategories.isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton
                        className='h-10 w-full bg-[#F0EEDE]/20'
                        key={index}
                      />
                    ))
                  : fetchAllCategoriesData?.data?.map((category) => (
                      <button
                        className={
                          'rounded-xl px-3 py-2 text-left text-sm font-medium ' +
                          (activeCategory === category.slug
                            ? 'bg-[#F0EEDE] text-[#004643]'
                            : 'bg-[#F0EEDE]/10 text-[#F0EEDE]')
                        }
                        key={category.id}
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {category.name}
                      </button>
                    ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
