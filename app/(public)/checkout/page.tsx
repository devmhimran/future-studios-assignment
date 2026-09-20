import { Metadata } from 'next';
import { CheckoutPageContent } from '@/components/pages/checkout-page';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Checkout | Future Store';
  const description =
    'Complete your order at Future Store. Secure checkout with multiple payment options.';
  const canonicalUrl = `${BASE_URL}/checkout`;

  return {
    title,
    description,
    keywords: ['checkout', 'future store', 'order', 'payment', 'secure checkout'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Future Store',
      images: [
        {
          url: `${BASE_URL}/og.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og.jpg`],
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
