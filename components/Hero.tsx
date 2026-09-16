import Image from 'next/image';
import heroContractor from '@/app/assets/images/hero-contractor.jpg';
import { CtaLink } from './CtaLink';

export function Hero() {
  return (
    <section className='px-0'>
      <div className='relative'>
        <Image
          src={heroContractor}
          alt='Contractor reviewing project details on a jobsite'
          className='h-[264px] w-full object-cover md:h-[420px]'
          priority
          sizes='100vw'
        />
        {/* [CONFIRM] Placeholder device mockup — Figma left this box
            empty. Swap the dashed content below for a real screenshot
            of the assessment tool (as an <Image>), or delete this div. */}
        <div className='absolute left-6 top-6 flex h-[196px] w-[132px] items-center justify-center rounded-lg border-4 border-black bg-white p-2 text-center font-sans text-[11px] font-semibold leading-tight text-black/40 md:left-10 md:top-10 md:h-[260px] md:w-[176px]'>
          Add assessment tool screenshot here
        </div>
      </div>

      <div className='px-6 pb-10 pt-6 md:mx-auto md:max-w-[720px] md:text-center'>
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
          className='mt-6 flex h-14 w-full items-center justify-center rounded-lg bg-blue px-6 font-sans text-xl font-extrabold text-white no-underline md:inline-flex md:w-auto md:px-10'
        >
          Start the assessment
        </CtaLink>
      </div>
    </section>
  );
}
