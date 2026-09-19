'use client';

import { useParams } from 'next/navigation';

export function ProductDetailsPageContent() {
  const params = useParams();

  return <div>{params.slug}</div>;
}
