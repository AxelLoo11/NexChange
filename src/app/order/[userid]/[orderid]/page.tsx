"use client";

import Navigation from '@/components/Navigation';
import { ChrisOrderList } from '@/mockdata/mockorder';
import { OrderInfo } from '@/models/orderInfo';
import Link from 'next/link';
import React from 'react';

export default function OrderDetailPage({ params }: { params: { userid: string; orderid: string } }) {
  const order: OrderInfo = ChrisOrderList.find(r => r.id === params.orderid) as OrderInfo;

  const handleCancel = () =>{
    if (order.status === "UNPAID") {
      console.log("Cancel Order ", order.id);
    }
    else{
      console.log("Error Cancel Logic!");
    }
  };

  const handlePayment = () => {
    if (order.status === "UNPAID") {
      // send status change api request ...
      console.log("Pay Order ", order.id);
    }
    else {
      console.log("Error Payment Logic!");
    }
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation userId={params.userid} />
      </div>

      {/* Order Display */}
      <div className="flex flex-col p-4 bg-gray-50 overflow-auto w-full lg:w-[calc(100vw-10rem)]">
        <Link href={`/order/${params.userid}`} className='w-full bg-yellow-400 rounded-lg hover:bg-yellow-600 p-4 text-white font-bold'>
          &#11207; Return
        </Link>
        <h1 className="text-2xl font-bold my-4">Order Detail</h1>

        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex">
          <img src={order.refPostShortcut} alt={order.refPostTitle} className="w-32 h-32 object-cover rounded-lg mr-6" />
          <div className="flex-1">
            <p className="mb-2"><strong>Title:</strong> {order.refPostTitle}</p>
            <p className="mb-2"><strong>Price:</strong> ${order.refPostPrice.toFixed(2)}</p>
            <p className="mb-2"><strong>Status:</strong> {order.status}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Seller Details</h2>
          <p className="mb-1"><strong>Name:</strong> {order.refSeller.name}</p>
          <p className="mb-1"><strong>Address:</strong> {order.refSeller.address}</p>
          <p className="mb-1"><strong>Postal Code:</strong> {order.refSeller.postalCode}</p>
          <p className="mb-1"><strong>Contact Number:</strong> {order.refSeller.contactNumber}</p>
        </div>

        <div className="flex justify-between my-4">
          <button
            className={`flex-none w-1/5 mr-1 p-2 rounded-lg ${order.status === 'UNPAID' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            disabled={order.status !== 'UNPAID'}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`flex-auto ml-1 p-2 rounded-lg ${order.status === 'UNPAID' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            disabled={order.status !== 'UNPAID'}
            onClick={handlePayment}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  )
}
