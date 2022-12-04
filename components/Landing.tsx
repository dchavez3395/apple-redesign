import Image from 'next/image'
import React from 'react'
import Button from './Button'

export default function Landing() {
  return (
    <section className='items-center justify-between px-8 h-screen max-w-[1350px] sticky top-0 mx-auto flex'>
      <div className='space-y-8'>
        <h1 className='font-semibold text-5xl lg:text-6xl xl:text-7xl tracking-wide space-y-3'>
            <span className='block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>Powered</span>
            <span className='block'>By Intellect</span>
            <span className='block'>Driven By Technology</span>
        </h1>
            <div className='space-x-8'>
                <Button title='Buy Now' />
                <a className="link">Learn More</a>
            </div>
      </div>
      <div className='hidden relative transition-all duration-500 h-[450px] w-[450px] md:inline lg:w-[600px] lg:h-[650px]'>
            <img src='/../assets/iphone.png' className='w-full object-contain' alt='/'/>
        </div>
    </section>
  )
}
