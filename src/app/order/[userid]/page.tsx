import Navigation from '@/components/Navigation'
import { mockUser3 } from '@/mockdata/mockuser'
import { ContactInfo } from '@/models/userInfo'
import Link from 'next/link';
import React from 'react'

export default function OrderHistoryPage({ params }: { params: { userid: string } }) {
  const contactList: ContactInfo[] = mockUser3.contacts; // dummy data ...
  const defaultContact: ContactInfo = contactList.find(contact => contact.isDefault) as ContactInfo;

  return (
    <div className="bg-gray-100 min-h-screen lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation userId={params.userid} />
      </div>

      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)]">
        {/* Contacts Part */}
        <div className='flex flex-col w-full bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <h2>User Defualt Contact: </h2>
          <div className='flex w-full h-full border border-gray-600 rounded-lg hover:bg-gray-100'>
            <div className='flex-auto p-2'>
              <h2>{defaultContact.name}</h2>
              <p>{defaultContact.phoneNumber}</p>
              <p>{`${defaultContact.address} - ${defaultContact.postalCode}`}</p>
            </div>
            <div className='flex-none h-full flex justify-center items-center'>
              <Link
                href={`/order/${params.userid}/contacts`}
                className='h-full w-full flex justify-center items-center text-gray-500 px-2'
              >
                Select &#11208; {/* Right Arrow */}
              </Link>
            </div>
          </div>
        </div>
        {/* Order History Container */}
        <div className='w-full flex-auto overflow-auto p-4'>
          Order List ...
        </div>
      </div>
    </div>
  )
}
