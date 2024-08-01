"use client";
import Image from "next/image";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/moving-border";

export default function Home() {
  return (
    <div className='min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg'>
      <div className='absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />

      <Boxes />
      <div className='p-4 relative z-10 w-full text-center'>
        <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
          Want to Gather Real FeedBack ?
        </h1>
        <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
          {` We provide a platform to gather real feedback from real users.
          
          `}
        </p>
        <div className='mt-4'>
          <Link href={"/profile"}>
            <Button
              borderRadius='1.75rem'
              className='bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800'
            >
              {`I'm Ready`}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
