'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { CheckoutOrderSummary } from './checkout-order-summary';
import { CheckoutShippingForm } from './checkout-shipping-form';
import { CheckoutPayment } from './checkout-payment';
import { CheckoutSuccess } from './checkout-success';

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FS-${timestamp}-${random}`;
}

export function CheckoutPageContent() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleValidChange = useCallback((valid: boolean) => {
    setIsFormValid(valid);
  }, []);

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className='grid min-h-screen place-items-center bg-[#F0EEDE]'>
        <div className='text-center'>
          <ShoppingBag className='mx-auto size-12 text-[#004643]/30' />
          <h1 className='mt-4 text-2xl font-semibold text-[#004643]'>
            Your cart is empty
          </h1>
          <p className='mt-2 text-sm text-[#004643]/60'>
            Add some products before checking out.
          </p>
          <Button
            className='mt-6 bg-[#004643] text-[#F0EEDE] hover:bg-[#003d3a] hover:text-[#F0EEDE]'
            size='lg'
          >
            <Link className='flex items-center gap-2' href='/shops'>
              <ArrowLeft className='size-4' />
              Browse products
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return <CheckoutSuccess orderId={orderId} />;
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const id = generateOrderId();
      setOrderId(id);
      clearCart();
      setOrderPlaced(true);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <main className='min-h-screen overflow-x-hidden bg-[#F0EEDE]'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
        <div className='flex items-center gap-3'>
          <Link
            className='rounded-lg p-2 text-[#004643]/60 transition hover:bg-[#004643]/5 hover:text-[#004643]'
            href='/shops'
          >
            <ArrowLeft className='size-5' />
          </Link>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#004643]/60'>
              Checkout
            </p>
            <h1 className='mt-1 text-3xl font-semibold tracking-tight text-[#004643] sm:text-4xl'>
              Complete your order
            </h1>
          </div>
        </div>

        <div className='mt-10 grid gap-8 lg:grid-cols-[1fr_380px]'>
          <div className='min-w-0 space-y-6'>
            <CheckoutShippingForm onValidChange={handleValidChange} />
            <CheckoutPayment />
          </div>

          <div className='min-w-0'>
            <CheckoutOrderSummary
              isFormValid={isFormValid}
              isProcessing={isProcessing}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
