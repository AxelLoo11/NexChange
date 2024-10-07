import Header from '@/components/Header';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className='text-white'>Home Page</div>
      <a href='/explore'>Explore</a>
    </>
  );
}
