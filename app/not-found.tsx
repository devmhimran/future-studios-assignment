import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center px-4 text-center'>
      <span className='grid size-20 place-items-center rounded-full bg-[#004643]/10 text-3xl font-extrabold text-[#004643]'>
        FS
      </span>
      <h1 className='mt-8 text-6xl font-extrabold tracking-tight text-[#004643]'>
        404
      </h1>
      <p className='mt-4 max-w-sm text-lg text-[#004643]/60'>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        className='mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[#004643] px-6 text-sm font-medium text-white transition hover:bg-[#003d3a]'
        href='/'
      >
        Back to home
      </Link>
    </div>
  );
}
