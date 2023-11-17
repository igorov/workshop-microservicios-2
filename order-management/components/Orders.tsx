"use client";

import React, { useEffect, useState, useRef } from 'react';
import { IOrder } from "@/types/orders";
import { ICustomer } from "@/types/customers";
import AddOrder from './orders/AddOrder';
import OrderList from './orders/OrderList';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  // Workaround to avoid fetching data on the server
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    fetchCustomers();
    // Workaround to avoid fetching data on the server
    //if (dataFetchedRef.current) return;
    //dataFetchedRef.current = true;

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 1500);
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);

  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true); // Set loading to false when the data is fetched
      const response = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_QUERY_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the data is fetched
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrder = async (order: IOrder) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_COMMAND_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    const newTodo = await res.json();
    return newTodo;

  }

  return (
    <main className='max-w-4xl mx-auto mt-4'>

      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Listado de órdenes</h1>
        {customers.length > 0 && <AddOrder addOrder={addOrder} fetchOrders={fetchOrders} customers={customers} />}
      </div>

      <OrderList orders={orders} />

    </main>
  );
};

export default Orders
