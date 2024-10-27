import Navigation from '@/components/Navigation'
import OrderList from '@/components/OrderList';
import { fetchUserContacts, fetchUserOrders } from '@/lib';
import { UserContact, UserContactList, UserOrderHistoryList } from '@/models';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export default async function OrderHistoryPage({ params }: { params: { userid: string } }) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userid')?.value || ""; // login user's userid
  const token = cookieStore.get('token')?.value || "";
  const tokenType = cookieStore.get('tokenType')?.value || "";
  const authHeader: string = `${tokenType}${token}`;

  const contactList: UserContactList = await fetchUserContacts(userId, authHeader);
  const defaultContact: UserContact = contactList.userContacts.find(contact => contact.defaultContact) as UserContact;

  const orderList: UserOrderHistoryList = await fetchUserOrders(userId, authHeader);

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation />
      </div>

      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)]">
        {/* Contacts Part */}
        <div className='flex flex-col w-full bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <h2>User Default Contact: </h2>
          {defaultContact ? (
            <div className="flex w-full h-full border border-gray-600 rounded-lg hover:bg-gray-100">
              <div className="flex-auto p-2">
                <h2>{defaultContact.contactName}</h2>
                <p>{defaultContact.contactNumber}</p>
                <p>{`${defaultContact.contactAddress} - ${defaultContact.postalCode}`}</p>
              </div>
              <div className="flex-none h-full flex justify-center items-center">
                <Link
                  href={`/order/${params.userid}/contacts/${contactList.contactListId}`}
                  className="h-full w-full flex justify-center items-center text-gray-500 px-2"
                >
                  Select &#11208; {/* Right Arrow */}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex w-full h-full border border-gray-600 rounded-lg hover:bg-gray-100 justify-center items-center">
              <Link
                href={`/order/${params.userid}/contacts/${contactList.contactListId}`}
                className="h-full w-full flex justify-center items-center text-gray-500 px-2"
              >
                Add New Contact ...
              </Link>
            </div>
          )}
        </div>
        {/* Order History Container */}
        <div className='w-full flex-auto p-4'>
          <OrderList orders={orderList.userOrderHistories} pathname={`/order/${params.userid}`} />
        </div>
      </div>
    </div>
  )
}
