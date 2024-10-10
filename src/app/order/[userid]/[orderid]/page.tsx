import React from 'react'

export default function OrderDetailPage({ params }: { params: { userid: string; orderid: string } }) {
  return (
    <div>Order Detail Page for id {params.orderid}</div>
  )
}
