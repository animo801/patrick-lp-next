import Image from 'next/image';
import heroContractor from '@/app/assets/images/hero-contractor.jpg';
import { CtaLink } from './CtaLink';

export function Hero({ ctaHref }: { ctaHref?: string } = {}) {
  return (
    <section className='px-0 md:px-6'>
      <div className='md:mx-auto md:flex md:max-w-[1100px] md:items-center md:gap-12'>
        <div className='relative overflow-hidden md:flex-1'>
          <Image
            src={heroContractor}
            alt='Contractor reviewing project details on a jobsite'
            className='h-[264px] w-full object-cover md:h-[440px] md:rounded-lg'
            priority
            sizes='(min-width: 768px) 50vw, 100vw'
          />
          {/* Muted + playsInline so it autoplays on phones too. The
              video has its own device frame baked in, so no border here. */}
          <video
            src='/hero-web.mp4'
            poster='/hero-poster.jpg'
            autoPlay
            muted
            loop
            playsInline
            aria-hidden='true'
            className='hero-video-rise absolute left-3 top-5 h-[226px] w-[152px] rounded-lg object-cover md:left-4 md:top-10 md:h-[306px] md:w-[206px]'
          />
        </div>

        <div className='px-6 pb-10 pt-6 md:flex-1 md:px-0 md:py-0'>
          <p className='mb-1 font-sans text-sm font-bold text-black/60 md:text-base'>
            The Millionaire Contractor Blueprint
          </p>
          <h1 className='text-[32px] leading-[1.1] md:text-[48px]'>
            Get your financials reviewed by an expert. 100% free.
          </h1>
          <p className='mt-2 font-sans text-lg leading-[1.4] text-black md:text-xl'>
            After answering a few questions, Patrick uses his 30 years of banking
            experience to give you an honest assesment of what needs to change.
          </p>
          <CtaLink
            id='hero-cta'
            href={ctaHref}
            className='mt-6 flex h-14 w-full items-center justify-center rounded-lg bg-blue px-6 font-sans text-xl font-extrabold text-white no-underline md:inline-flex md:w-auto md:px-10'
          >
            Start the assessment
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
