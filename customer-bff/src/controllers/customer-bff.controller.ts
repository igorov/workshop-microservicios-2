import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as customerBffService from '../services/customer-bff.service';
import { logger } from '../utils/logger';

// Definición de las funciones controller


export const getAll = async (request: Request, h: ResponseToolkit) => {
    try {
        const customerBff = await customerBffService.getAll();
        return h.response(customerBff);
    } catch(error: any) {
        logger.error(error);
        const e = Boom.internal("Error interno");
        e.output.payload.message = 'Mensaje de error';
        return e;
    }
}
