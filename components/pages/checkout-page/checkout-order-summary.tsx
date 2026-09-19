'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

interface CheckoutOrderSummaryProps {
  isProcessing: boolean;
  onPlaceOrder: () => void;
  isFormValid: boolean;
}

export function CheckoutOrderSummary({
  isProcessing,
  onPlaceOrder,
  isFormValid,
}: CheckoutOrderSummaryProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className='rounded-sm border border-[#004643]/10 bg-[#f7f7ed] p-4 sm:p-5'>
      <h2 className='text-base font-semibold text-[#004643]'>
        Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h2>

      <div className='mt-4 max-h-80 space-y-3 overflow-y-auto'>
        {items.map((item) => (
          <div
            className='flex gap-3 rounded-sm border border-[#004643]/10 bg-white p-3'
            key={item.product.slug}
          >
            <div className='relative size-16 shrink-0 overflow-hidden rounded-sm bg-slate-100'>
              <Image
                alt={item.product.title}
                className='object-cover'
                fill
                sizes='64px'
                src={item.product.thumbnail}
              />
            </div>
            <div className='flex min-w-0 flex-1 flex-col justify-between'>
              <div>
                <p className='truncate text-xs font-bold uppercase tracking-[0.12em] text-[#004643]/50'>
                  {item.product.brand}
                </p>
                <p className='mt-0.5 truncate text-sm font-medium text-[#004643]'>
                  {item.product.title}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <Button
                    aria-label='Decrease quantity'
                    className='size-6 text-[#004643] hover:bg-[#004643]/5'
                    onClick={() =>
                      updateQuantity(item.product.slug, item.quantity - 1)
                    }
                    size='icon'
                    variant='ghost'
                  >
                    <Minus className='size-3' />
                  </Button>
                  <span className='w-6 text-center text-xs font-semibold text-[#004643]'>
                    {item.quantity}
                  </span>
                  <Button
                    aria-label='Increase quantity'
                    className='size-6 text-[#004643] hover:bg-[#004643]/5'
                    onClick={() =>
                      updateQuantity(item.product.slug, item.quantity + 1)
                    }
                    size='icon'
                    variant='ghost'
                  >
                    <Plus className='size-3' />
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-bold text-[#004643]'>
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                  <Button
                    aria-label={`Remove ${item.product.title}`}
                    className='size-5 text-[#004643]/30 hover:bg-red-50 hover:text-red-600'
                    onClick={() => removeItem(item.product.slug)}
                    size='icon'
                    variant='ghost'
                  >
                    <Trash2 className='size-3' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4 space-y-2 border-t border-[#004643]/10 pt-4'>
        <div className='flex justify-between text-sm'>
          <span className='text-[#004643]/60'>Subtotal</span>
          <span className='font-medium text-[#004643]'>
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-[#004643]/60'>Shipping</span>
          <span className='text-[#004643]/50'>Free</span>
        </div>
        <div className='flex justify-between border-t border-[#004643]/10 pt-2'>
          <span className='text-base font-semibold text-[#004643]'>Total</span>
          <span className='text-base font-bold text-[#004643]'>
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <Button
        className='mt-4 w-full bg-[#004643] text-[#F0EEDE] hover:bg-[#003d3a] hover:text-[#F0EEDE]'
        disabled={!isFormValid || isProcessing}
        onClick={onPlaceOrder}
        size='lg'
      >
        {isProcessing ? (
          <>
            <Loader2 className='size-4 animate-spin' />
            Processing...
          </>
        ) : (
          'Place order'
        )}
      </Button>

      <p className='mt-3 text-center text-xs text-[#004643]/45'>
        By placing this order you agree to our terms and conditions.
      </p>
    </div>
  );
}
