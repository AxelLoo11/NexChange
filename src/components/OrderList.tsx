import React from 'react';
import OrderCard from './OrderCard';
import { Order } from '@/models';

const OrderList = ({ orders, pathname }: { orders: Order[]; pathname: string }) => (
  <div className="w-full h-full overflow-auto">
    {orders.map(order => (
      <OrderCard key={order.orderId} order={order} pathname={pathname} />
    ))}
  </div>
);

export default OrderList;
