import React from 'react';
import OrderClientComponent from './orderClientComponent';
import { cookies } from 'next/headers';
import { fetchOrderById } from '@/lib';

export default async function OrderDetailPage({ params }: { params: { userid: string; orderid: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || "";
  const tokenType = cookieStore.get('tokenType')?.value || "";
  const authHeader: string = `${tokenType}${token}`;

  const order = await fetchOrderById(params.orderid, authHeader);

  return (
    <>
      <OrderClientComponent fetchedOrder={order} userId={params.userid} />
    </>
  )
}
