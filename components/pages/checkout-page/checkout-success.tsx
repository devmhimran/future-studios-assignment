'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface CheckoutSuccessProps {
  orderId: string;
}

export function CheckoutSuccess({ orderId }: CheckoutSuccessProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [confettiActive, setConfettiActive] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    timerRef.current = setTimeout(() => setConfettiActive(false), 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <main className='relative min-h-screen overflow-hidden bg-[#F0EEDE]'>
      {confettiActive && dimensions.width > 0 && (
        <div className='pointer-events-none fixed inset-0 z-50'>
          <ReactConfetti
            colors={['#004643', '#F0EEDE', '#f7f7ed', '#e6c76e', '#d4a843']}
            gravity={0.8}
            height={dimensions.height}
            initialVelocityX={4}
            initialVelocityY={20}
            numberOfPieces={400}
            recycle={false}
            width={dimensions.width}
          />
        </div>
      )}

      <div className='mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8'>
        <span className='mx-auto grid size-20 place-items-center rounded-full bg-emerald-100'>
          <CheckCircle className='size-10 text-emerald-600' />
        </span>

        <h1 className='mt-6 text-3xl font-semibold tracking-tight text-[#004643]'>
          Order confirmed!
        </h1>
        <p className='mt-2 text-sm text-[#004643]/60'>
          Thank you for your purchase. We&apos;ll send you a confirmation email
          shortly.
        </p>

        <div className='mt-8 rounded-sm border border-[#004643]/10 bg-[#f7f7ed] p-5 text-left'>
          <div className='flex items-center gap-2 text-sm font-semibold text-[#004643]'>
            <Package className='size-4' />
            Order Details
          </div>
          <div className='mt-4 space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-[#004643]/60'>Order ID</span>
              <span className='font-mono font-medium text-[#004643]'>
                {orderId}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-[#004643]/60'>Payment</span>
              <span className='font-medium text-[#004643]'>
                Cash on Delivery
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-[#004643]/60'>Status</span>
              <span className='rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700'>
                Processing
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-[#004643]/60'>Estimated delivery</span>
              <span className='font-medium text-[#004643]'>
                3-5 business days
              </span>
            </div>
          </div>
        </div>

        <Button
          className='mt-8 bg-[#004643] text-[#F0EEDE] hover:bg-[#003d3a] hover:text-[#F0EEDE]'
          size='lg'
        >
          <Link className='flex items-center gap-2' href='/shops'>
            Continue shopping
            <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
    </main>
  );
}
