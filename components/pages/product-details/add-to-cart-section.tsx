'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import type { ProductDetail } from '@/types';

interface AddToCartSectionProps {
  product: ProductDetail;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className='flex items-center gap-3 border-t border-[#004643]/10 pt-6'>
      <div className='flex items-center rounded-lg border border-[#004643]/20'>
        <Button
          aria-label='Decrease quantity'
          className='size-10 rounded-l-lg rounded-r-none text-[#004643] hover:bg-[#004643]/5'
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          size='icon'
          variant='ghost'
        >
          <Minus className='size-4' />
        </Button>
        <span className='flex h-10 w-12 items-center justify-center border-x border-[#004643]/20 text-sm font-semibold text-[#004643]'>
          {quantity}
        </span>
        <Button
          aria-label='Increase quantity'
          className='size-10 rounded-r-lg rounded-l-none text-[#004643] hover:bg-[#004643]/5'
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          size='icon'
          variant='ghost'
        >
          <Plus className='size-4' />
        </Button>
      </div>

      <Button
        className='h-10 flex-1 bg-[#004643] text-[#F0EEDE] hover:bg-[#003d3a] hover:text-[#F0EEDE]'
        onClick={handleAdd}
        size='lg'
      >
        {added ? (
          <>
            <Check className='size-4' />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingBag className='size-4' />
            Add to cart
          </>
        )}
      </Button>
    </div>
  );
}
