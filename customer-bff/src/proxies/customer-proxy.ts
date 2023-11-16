import { CustomerEntity } from '../entities/customer-entity';
import { logger } from '../utils/logger';

export const getCustomers = async (): Promise<CustomerEntity[]> => {
    const customerApiURL = process.env.CUSTOMER_API_URL;

    // Consumir por GET el API de risk
    const response = await fetch(`${customerApiURL}/customers`);
    const data = await response.json();
    logger.info(`Respuesta del API de riesgo: ${JSON.stringify(data)}`);
    return data;
}
