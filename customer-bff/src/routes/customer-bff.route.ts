import * as Joi from 'joi';
import { Server } from "@hapi/hapi";
import * as customerBffController from '../controllers/customer-bff.controller';
import { CustomerBffEntity } from '../entities/customer-bff.entity';


export const customerBffRoutes = (server: Server) => {
  // Definicion de los routes
  
  server.route({
    method: 'GET',
    path: '/customers',
    handler: customerBffController.getAll
  });
  
  
};
