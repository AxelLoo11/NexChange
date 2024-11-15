import { UserOrderHistory } from '@/models';
import Link from 'next/link';
import React from 'react';

export default function OrderCard({ order, pathname }: { order: UserOrderHistory; pathname: string }) {
    const orderColor: string = order.refOrderStatus === "UNPAID" ? "R" :
        order.refOrderStatus === "EXPIRED" ? "B" :
            order.refOrderStatus === "COMPLETED" || order.refOrderStatus === "RECEIVED" ? "G" : "Y";

    return (
        <div className={`flex w-full h-32 border border-gray-200 bg-white my-2 shadow-md`}
        >
            <img
                src={order.refOrderShoutCutURL}
                alt="Order Shortcut"
                className='w-32 h-32 rounded-sm flex-none p-2'
            />

            <div className='flex flex-auto flex-col p-2'>
                <Link
                    href={`${pathname}/${order.refOrderId}`}
                    className='w-full text-yellow-700 hover:text-yellow-900 font-bold text-lg hover:underline'
                >
                    {order.refOrderTitle}
                </Link>

                <div className='w-full font-light'>
                    <p>Price: ${order.refOrderPrice}</p>
                </div>

                <div className='w-full font-bold'>
                    <span>Status: </span>
                    <span className={
                        orderColor === 'R' ? 'text-red-500' :
                            orderColor === 'G' ? 'text-green-500' :
                                orderColor === 'Y' ? 'text-yellow-500' :
                                    orderColor === 'B' ? 'text-gray-500' : ''
                    }>
                        {order.refOrderStatus}
                    </span>
                </div>
            </div>

            <div className={`flex-none w-1/5 h-full flex justify-center items-center bg-gradient-to-r from-white
                ${orderColor === 'R' ? 'to-red-300' :
                    orderColor === 'G' ? 'to-green-300' :
                        orderColor === 'Y' ? 'to-yellow-300' :
                            orderColor === 'B' ? 'to-gray-300' : 'to-gray-100'
                }`}
            >
                <Link
                    href={`${pathname}/${order.refOrderId}`}
                    className='h-full w-full flex justify-end items-center text-gray-400 px-4 text-lg'
                >
                    &#11208;
                </Link>
            </div>
        </div>
    )
}
