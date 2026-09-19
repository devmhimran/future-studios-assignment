'use client';

import { Button } from '@/components/ui/button';
import { CustomSheet } from '@/components/shared/custom-sheet';
import { useCartStore } from '@/store/cart-store';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <>
      <Button
        aria-label='Shopping cart'
        className='relative rounded-xl'
        onClick={() => setOpen(true)}
        size='icon-lg'
        variant='outline'
      >
        <ShoppingBag className='size-4' />
        <span className='absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#F0EEDE] text-[10px] font-bold text-[#004643]'>
          {totalItems}
        </span>
      </Button>

      <CustomSheet
        isOpen={open}
        setIsOpen={setOpen}
        title={`Cart (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
        side='right'
        className='sm:max-w-md'
      >
        <div className='flex h-full flex-col'>
          {items.length === 0 ? (
            <div className='flex flex-1 flex-col items-center justify-center py-16'>
              <ShoppingBag className='size-12 text-[#004643]/20' />
              <p className='mt-4 text-sm font-medium text-[#004643]'>
                Your cart is empty
              </p>
              <p className='mt-1 text-xs text-[#004643]/50'>
                Add some products to get started.
              </p>
            </div>
          ) : (
            <>
              <div className='flex-1 space-y-4 py-4'>
                {items.map((item) => (
                  <div
                    className='flex gap-4 rounded-sm border border-[#004643]/10 p-3'
                    key={item.product.slug}
                  >
                    <div className='relative size-20 shrink-0 overflow-hidden rounded-sm bg-slate-100'>
                      <Image
                        alt={item.product.title}
                        className='object-cover'
                        fill
                        sizes='80px'
                        src={item.product.thumbnail}
                      />
                    </div>
                    <div className='flex flex-1 flex-col justify-between min-w-0'>
                      <div>
                        <p className='truncate text-xs font-bold uppercase tracking-[0.12em] text-[#004643]/50'>
                          {item.product.brand}
                        </p>
                        <p className='mt-0.5 truncate text-sm font-medium text-[#004643]'>
                          {item.product.title}
                        </p>
                      </div>
                      <div className='flex flex-col md:flex-row md:items-center justify-between gap-1'>
                        <div className='flex items-center gap-1'>
                          <Button
                            aria-label='Decrease quantity'
                            className='size-7 text-[#004643] hover:bg-[#004643]/5'
                            onClick={() =>
                              updateQuantity(
                                item.product.slug,
                                item.quantity - 1,
                              )
                            }
                            size='icon'
                            variant='ghost'
                          >
                            <Minus className='size-3' />
                          </Button>
                          <span className='w-8 text-center text-sm font-semibold text-[#004643]'>
                            {item.quantity}
                          </span>
                          <Button
                            aria-label='Increase quantity'
                            className='size-7 text-[#004643] hover:bg-[#004643]/5'
                            onClick={() =>
                              updateQuantity(
                                item.product.slug,
                                item.quantity + 1,
                              )
                            }
                            size='icon'
                            variant='ghost'
                          >
                            <Plus className='size-3' />
                          </Button>
                        </div>
                        <div className='flex items-center justify-between gap-2'>
                          <span className='text-sm font-bold text-[#004643]'>
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <Button
                            aria-label={`Remove ${item.product.title}`}
                            className='size-7 text-[#004643]/40 hover:bg-red-50 hover:text-red-600'
                            onClick={() => removeItem(item.product.slug)}
                            size='icon'
                            variant='ghost'
                          >
                            <Trash2 className='size-3.5' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='border-t border-[#004643]/10 pt-4 space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-[#004643]/60'>Subtotal</span>
                  <span className='text-sm font-semibold text-[#004643]'>
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-[#004643]/60'>Shipping</span>
                  <span className='text-sm text-[#004643]/50'>Free</span>
                </div>
                <div className='flex items-center justify-between border-t border-[#004643]/10 pt-3'>
                  <span className='text-base font-semibold text-[#004643]'>
                    Total
                  </span>
                  <span className='text-base font-bold text-[#004643]'>
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link href='/checkout' onClick={() => setOpen(false)}>
                  <Button className='w-full bg-[#004643] text-[#F0EEDE] hover:bg-[#003d3a] hover:text-[#F0EEDE]'>
                    Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </CustomSheet>
    </>
  );
}
