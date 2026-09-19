'use client';

import { Banknote } from 'lucide-react';

export function CheckoutPayment() {
  return (
    <div className='rounded-sm border border-[#004643]/10 bg-[#f7f7ed] p-4 sm:p-5'>
      <h2 className='text-base font-semibold text-[#004643]'>Payment Method</h2>

      <div className='mt-4 flex items-center gap-3 rounded-sm border-2 border-[#004643] bg-white p-4'>
        <span className='grid size-10 place-items-center rounded-full bg-[#004643]/10'>
          <Banknote className='size-5 text-[#004643]' />
        </span>
        <div>
          <p className='text-sm font-semibold text-[#004643]'>
            Cash on Delivery
          </p>
          <p className='text-xs text-[#004643]/50'>
            Pay when your order arrives
          </p>
        </div>
        <span className='ml-auto size-4 rounded-full border-4 border-[#004643]' />
      </div>
    </div>
  );
}
