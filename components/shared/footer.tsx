import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  { href: '#shop', label: 'New arrivals' },
  { href: '#discover', label: 'Categories' },
  { href: '#shop', label: 'Best rated' },
] as const;

const socialLinks = [
  { href: '#top', label: 'Instagram' },
  { href: '#top', label: 'Twitter' },
] as const;

export function Footer() {
  return (
    <footer className='mt-20 bg-[#004643] text-[#F0EEDE]/75'>
      <div className='mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8'>
        <div>
          <Link
            className='flex items-center gap-2 text-xl font-extrabold tracking-tight text-white'
            href='#top'
          >
            <span className='grid size-9 place-items-center rounded-full bg-[#F0EEDE] text-sm text-[#004643]'>
              FS
            </span>
            future<span className='text-[#F0EEDE]/55'>.</span>
          </Link>
          <p className='mt-4 max-w-sm text-sm leading-6 text-slate-400'>
            A brighter way to discover the everyday things you will love for
            years.
          </p>
        </div>
        <div>
          <p className='text-sm font-bold text-white'>Explore</p>
          <div className='mt-4 grid gap-3 text-sm'>
            {footerLinks.map((link) => (
              <Link
                className='transition hover:text-[#F0EEDE]'
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className='text-sm font-bold text-white'>Stay in the loop</p>
          <Link
            className='mt-4 flex items-center gap-2 text-sm font-medium text-[#F0EEDE] hover:text-white'
            href='mailto:hello@future.store'
          >
            hello@future.store <ArrowUpRight className='size-4' />
          </Link>
          <div className='mt-5 flex gap-2'>
            {socialLinks.map((link) => (
              <Link
                aria-label={link.label}
                className='grid size-9 place-items-center rounded-full bg-white/10 text-xs hover:bg-[#F0EEDE]/20'
                href={link.href}
                key={link.label}
              >
                {link.label.slice(0, 1)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500'>
        © 2026 Future. Made for more delightful shopping.
      </div>
    </footer>
  );
}
