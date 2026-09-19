'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Category } from '@/types';
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}
export function Navbar({
  categories,
  activeCategory,
  onCategoryChange,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const selectCategory = (category: string) => {
    onCategoryChange(category);
    setMenuOpen(false);
  };

  return (
    <header className='sticky top-0 z-40 bg-[#004643]/90 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link
          className='flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#F0EEDE]'
          href='#top'
        >
          <span className='grid size-9 place-items-center rounded-full bg-[#004643] text-sm text-[#F0EEDE]'>
            FS
          </span>
          future<span className='text-[#F0EEDE]/55'>.</span>
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          <Link
            className='rounded-lg px-3 py-2 text-sm font-medium text-[#F0EEDE]  hover:bg-[#F0EEDE]/20 hover:text-[#F0EEDE]'
            href='#shop'
          >
            Shop
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
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
              <DropdownMenuGroup>
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
              <DropdownMenuSeparator className='bg-[#004643]/15' />
              <DropdownMenuGroup className='grid grid-cols-2 gap-1'>
                {categories.map((category) => (
                  <DropdownMenuItem
                    className={
                      activeCategory === category.slug
                        ? 'bg-[#004643] px-2.5 py-2 text-[#F0EEDE] focus:bg-[#004643] focus:text-[#F0EEDE]'
                        : 'px-2.5 py-2 focus:bg-[#004643]/10 focus:text-[#004643]'
                    }
                    key={category.id}
                    onClick={() => selectCategory(category.slug)}
                  >
                    {category.name}
                  </DropdownMenuItem>
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
          <Button
            aria-label='Shopping cart'
            className='relative rounded-xl'
            size='icon-lg'
            variant='outline'
          >
            <ShoppingBag className='size-4' />
            <span className='absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#F0EEDE] text-[10px] font-bold text-[#004643]'>
              0
            </span>
          </Button>
          <Button
            aria-label='Toggle navigation menu'
            className='rounded-xl md:hidden'
            onClick={() => setMenuOpen((open) => !open)}
            size='icon-lg'
            variant='ghost'
          >
            {menuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <div className='border-t border-[#F0EEDE]/15 bg-[#004643] px-4 py-4 md:hidden'>
          <div className='mx-auto grid max-w-7xl gap-2'>
            <Link
              className='rounded-xl px-3 py-2 font-medium text-[#F0EEDE] hover:bg-[#F0EEDE]/10'
              href='#shop'
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              className='rounded-xl px-3 py-2 font-medium text-[#F0EEDE] hover:bg-[#F0EEDE]/10'
              href='#discover'
              onClick={() => setMenuOpen(false)}
            >
              Discover
            </Link>
            <div className='grid grid-cols-2 gap-2 pt-2'>
              <button
                className={
                  'rounded-xl px-3 py-2 text-left text-sm font-medium ' +
                  (!activeCategory
                    ? 'bg-[#F0EEDE] text-[#004643]'
                    : 'bg-[#F0EEDE]/10 text-[#F0EEDE]')
                }
                onClick={() => selectCategory('')}
              >
                All categories
              </button>
              {categories.map((category) => (
                <button
                  className={
                    'rounded-xl px-3 py-2 text-left text-sm font-medium ' +
                    (activeCategory === category.slug
                      ? 'bg-[#004643] text-[#F0EEDE]'
                      : 'bg-[#F0EEDE]/10 text-[#F0EEDE]')
                  }
                  key={category.id}
                  onClick={() => selectCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
