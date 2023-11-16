import { CustomerBffEntity } from '../entities/customer-bff.entity';
import { getCustomers } from '../proxies/customer-proxy';
import { getRisk } from '../proxies/risk-proxy';
import { logger } from '../utils/logger';

export const getAll = async (): Promise<CustomerBffEntity[]> => {
    // Lógica
    const customers = await getCustomers();
    const list: CustomerBffEntity[] = [];
    for (const customer of customers) {
        const risk = await getRisk(customer.correo);
        
        const customerBff = new CustomerBffEntity();
        customerBff.id = customer.id;
        customerBff.nombre = customer.nombre;
        customerBff.saldo = customer.saldo;
        customerBff.correo = customer.correo;
        customerBff.risk = risk.risk;
        list.push(customerBff);
    }
    return list;
}
