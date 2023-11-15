import * as Joi from 'joi';
import { Server } from "@hapi/hapi";
import * as orderQueryController from '../controllers/order-query.controller';

export const orderQueryRoutes = (server: Server) => {
  // Definicion de los routes

  server.route({
    method: 'GET',
    path: '/orders',
    handler: orderQueryController.getAll
  });
  
};
