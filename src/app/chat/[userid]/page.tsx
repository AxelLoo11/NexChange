import Navigation from '@/components/Navigation';
import React from 'react';

export default function UserInfoPage({ params }: { params: { userid: string } }) {
  return (
    <div className="bg-gray-100 h-[calc(100vh-5rem)] lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation />
      </div>

      <div className="p-4 w-full lg:w-[calc(100vw-10rem)]">
        <h1>Chat Page for {params.userid}</h1>
      </div>
    </div>
  )
}
