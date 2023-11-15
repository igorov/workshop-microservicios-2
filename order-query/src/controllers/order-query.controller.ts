import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as orderQueryService from '../services/order-query.service';
import { OrderQueryEntity } from '../entities/order-query.entity';
import { logger } from '../utils/logger';

// Definición de las funciones controller
export const getAll = async (request: Request, h: ResponseToolkit) => {
    try {
        const orderQuery = await orderQueryService.getAll();
        return h.response(orderQuery);
    } catch(error: any) {
        logger.error(error);
        const e = Boom.internal("Error interno");
        e.output.payload.message = 'Mensaje de error';
        return e;
    }
}
