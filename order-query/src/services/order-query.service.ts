import { OrderQueryEntity } from '../entities/order-query.entity';
import { logger } from '../utils/logger';
import { OrderRepository, OrderRepositoryImpl } from '../repository/order-repository';

// Implementacion de funciones
const orderRepository: OrderRepository = new OrderRepositoryImpl();

export const getAll = async (): Promise<OrderQueryEntity[]> => {
    return orderRepository.getAll();
}
