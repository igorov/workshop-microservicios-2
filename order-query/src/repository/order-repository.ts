const { Firestore } = require('@google-cloud/firestore');
import { OrderQueryEntity } from '../entities/order-query.entity';
import { logger } from '../utils/logger';

export interface OrderRepository {
    getAll(): Promise<OrderQueryEntity[]>;
}

const firestore = new Firestore();
const orderView = process.env.ORDER_VIEW;
// Obtener la colección de usuarios
const collection = firestore.collection(orderView);

export class OrderRepositoryImpl implements OrderRepository {
    async getAll(): Promise<OrderQueryEntity[]> {
        logger.info("Inicio");
        const orderList: OrderQueryEntity[] = [];

        const orders = await collection.orderBy('orden', 'desc').get(); // Ordenar por el campo "orden" en forma descendente
        if (orders.empty) {
            logger.error('No se encontraron ordenes');
        }
        
        orders.forEach((doc: any) => {
            const documentData = doc.data();
            logger.info(`Doc: ${documentData}`)
            const order: OrderQueryEntity = new OrderQueryEntity()
            
            order.cliente = documentData.cliente;
            order.estado = documentData.estado;
            order.descripcion = documentData.descripcion;
            order.monto = documentData.monto;
            order.orden = documentData.orden;
            orderList.push(order);
        });
        return orderList;
    }
}