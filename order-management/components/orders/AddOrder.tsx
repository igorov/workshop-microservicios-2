"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../shared/Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { ICustomer } from "@/types/customers";

interface OrderAddProps {
  addOrder: Function;
  fetchOrders: Function;
  customers: ICustomer[];
}

const AddOrder: React.FC<OrderAddProps> = ({ addOrder, fetchOrders, customers }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  //const [id_cliente, setId_cliente] = useState<number>(customers.length > 0 ? customers[0].id : 0);

  // Campos del formulario
  const [descripcion, setDescripcion] = useState<string>("");
  const [monto, setMonto] = useState<number>(0);
  //const [id_cliente, setId_cliente] = useState<number>(customers.length);
  // Asegúrate de que customers no esté vacío antes de acceder al primer elemento
  const [id_cliente, setId_cliente] = useState(customers.length > 0 ? customers[0].id : 0);
  /*const [id_cliente, setId_cliente] = useState<number | undefined>(
    customers.length > 0 ? customers[0].id : undefined
  );*/

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addOrder({
      descripcion,
      monto,
      cliente: id_cliente
    });
    setDescripcion("");
    setMonto(0);
    setId_cliente(customers.length > 0 ? customers[0].id : 0);

    setModalOpen(false);
    //router.push("/");
    //await fetchOrders();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-primary w-full'
      >
        Agregar nueva orden <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Agregar nueva orden</h3>
          <div className='modal-action flex flex-col gap-2'>
            <select
              value={id_cliente}
              onChange={(e) => setId_cliente(parseFloat(e.target.value))}
              className='input input-bordered w-full'
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.nombre}</option>
              ))}
            </select>
            <input
              value={monto}
              onChange={(e) => setMonto(parseFloat(e.target.value))}
              type='number'
              placeholder='Monto'
              className='input input-bordered w-full'
            />
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type='text'
              placeholder='Descripcion'
              className='input input-bordered w-full'
            />
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddOrder;
