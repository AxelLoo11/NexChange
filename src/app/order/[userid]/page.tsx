import Navigation from '@/components/Navigation'
import React from 'react'

export default function OrderHistoryPage({ params }: { params: { userid: string } }) {
    return (
        <div className="bg-gray-100 min-h-screen lg:flex w-full">
          <div className='lg:w-40 w-0'>
            <Navigation userId={params.userid} />
          </div>
          
          <div className="p-4 w-full lg:w-[calc(100vw-10rem)]">
            <h1>Order History Page for {params.userid}</h1>
          </div>
        </div>
    )
}
