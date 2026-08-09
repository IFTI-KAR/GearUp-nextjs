import React from 'react';
import OrderPaymentClient from './order-payment-client';

export function generateStaticParams() {
  return [{ id: '1' }];
}

export default function OrderPaymentPage() {
  return <OrderPaymentClient />;
}
