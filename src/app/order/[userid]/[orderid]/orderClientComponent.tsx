"use client";

import Navigation from '@/components/Navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { OrderDetail } from '@/models';


export default function OrderClientComponent({ fetchedOrder, userId }: { fetchedOrder: OrderDetail; userId: string; }) {
    const router = useRouter();
    const order: OrderDetail = fetchedOrder;
    const orderId = fetchedOrder.orderId;

    const handleCancel = async () => {
        if (order.orderStatus === "UNPAID") {
            try {
                const res = await fetch(`/api/order?orderId=${orderId}`, {
                    method: "DELETE",
                    credentials: 'include',
                });
                if (!res.ok) {
                    throw new Error('Failed to cancel order');
                }
                alert("Cancel Success!");

                router.push(`/order/${userId}`);
            } catch (error) {
                alert(error);
                console.error('Error cancel order:', error);
            }
        }
        else {
            console.log("Error Cancel Logic!");
        }
    };

    const handlePayment = async () => {
        if (order.orderStatus === "UNPAID") {
            try {
                const res = await fetch(`/api/payment?orderId=${orderId}`, {
                    method: "GET",
                    credentials: 'include',
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch order details');
                }
                alert("Pay Success!");

                router.push(`/order/${userId}`);
            } catch (error) {
                alert(error);
                console.error('Error pay order:', error);
            }
        }
        else {
            console.log("Error Payment Logic!");
        }
    }

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
            <div className='lg:w-40 w-0'>
                <Navigation />
            </div>

            {/* Order Display */}
            <div className="flex flex-col p-4 bg-gray-50 overflow-auto w-full lg:w-[calc(100vw-10rem)]">
                <Link href={`/order/${userId}`} className='w-full bg-yellow-400 rounded-lg hover:bg-yellow-600 p-4 text-white font-bold'>
                    &#11207; Return
                </Link>
                <h1 className="text-2xl font-bold my-4">Order Detail</h1>

                <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex">
                    <img src={order.refPostShortcutURL} alt={order.refPostTitle} className="w-32 h-32 object-cover rounded-lg mr-6" />
                    <div className="flex flex-1 flex-col">
                        <p className="mb-2 flex-1"><strong>Title:</strong> {order.refPostTitle}</p>
                        <p className="mb-2 flex-1"><strong>Price:</strong> ${order.refPostPrice.toFixed(2)}</p>
                        <div className='w-full flex mb-2 flex-1'>
                            <p><strong>Seller:</strong></p>
                            <Image
                                src={`/images/${order.sellerDetail.sellerAvatarURL}`}
                                alt="Owner Avatar"
                                className="p-1 rounded-full"
                                width={40}
                                height={40}
                            />
                            <p>{order.sellerDetail.sellerName}</p>
                        </div>
                        <p className="mb-2 flex-1"><strong>Status:</strong> {order.orderStatus}</p>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Order Address Info</h2>
                    <p className="mb-1"><strong>Name:</strong> {order.buyerDetail.buyerName}</p>
                    <p className="mb-1"><strong>Address:</strong> {order.buyerDetail.buyerAddress}</p>
                    <p className="mb-1"><strong>Postal Code:</strong> {order.buyerDetail.buyerPostalCode}</p>
                    <p className="mb-1"><strong>Contact Number:</strong> {order.buyerDetail.buyerContactNumber}</p>
                </div>

                <div className="flex justify-between my-4">
                    <button
                        className={`flex-none w-1/5 mr-1 p-2 rounded-lg ${order.orderStatus === 'UNPAID' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                        disabled={order.orderStatus !== 'UNPAID'}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className={`flex-auto ml-1 p-2 rounded-lg ${order.orderStatus === 'UNPAID' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                        disabled={order.orderStatus !== 'UNPAID'}
                        onClick={handlePayment}
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    )
}
