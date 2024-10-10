import React from 'react';
import { OrderInfo } from '@/models/orderInfo';
import OrderCard from './OrderCard';

const OrderList = ({ orders, pathname }: { orders: OrderInfo[]; pathname: string }) => (
  <div className="w-full h-full overflow-auto">
    {orders.map(order => (
      <OrderCard key={order.id} order={order} pathname={pathname} />
    ))}
  </div>
);

export default OrderList;
