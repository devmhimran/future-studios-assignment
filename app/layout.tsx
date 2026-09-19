import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DefaultProvider } from '@/components/providers';
import { Suspense } from 'react';
import { Loading } from '@/components/shared';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Future | Discover your next favorite thing',
  description: 'A colorful product discovery experience.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={`${inter.className} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <Suspense fallback={<Loading />}>
          <DefaultProvider>{children}</DefaultProvider>
        </Suspense>
      </body>
    </html>
  );
}
