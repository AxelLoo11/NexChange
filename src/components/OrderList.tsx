import React from 'react';
import OrderCard from './OrderCard';
import { UserOrderHistory } from '@/models';

const OrderList = ({ orders, pathname }: { orders: UserOrderHistory[]; pathname: string }) => (
  <div className="w-full h-full overflow-auto">
    {orders.map(order => (
      <OrderCard key={order.refOrderId} order={order} pathname={pathname} />
    ))}
  </div>
);

export default OrderList;
