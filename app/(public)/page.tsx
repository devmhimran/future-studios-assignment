import { HomepageContent } from '@/components/pages/home';

export default function Home() {
  console.log({ API_URL: process.env.API_URL });
  return <HomepageContent />;
}
