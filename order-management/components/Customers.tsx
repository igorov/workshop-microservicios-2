"use client";

import React, { useEffect, useState } from 'react';
import AddCustomer from "./customers/AddCustomer";
import { ICustomer } from "@/types/customers";
import CustomerList from './customers/CustomerList';

const Customers = () => {

  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async (customer: ICustomer) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    const newTodo = await res.json();
    return newTodo;
  }

  const editCustomer = async (customer: ICustomer) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
      const updatedTodo = await res.json();
      return updatedTodo;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true); // Set loading to false when the data is fetched
      const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_BFF_URL}/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCustomers(false); // Set loading to false when the data is fetched
    }
  };

  return (
    <main className='max-w-4xl mx-auto mt-4'>

      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Lista de clientes</h1>
        <AddCustomer addCustomer={addCustomer} fetchCustomers={fetchCustomers} />
      </div>

      {loadingCustomers ? (
        <div>Cargando...</div>
      ) : (
        <CustomerList customers={customers} editCustomer={editCustomer} deleteCustomer={deleteCustomer} fetchCustomers={fetchCustomers} />
      )}
    </main>
  );
};

export default Customers
