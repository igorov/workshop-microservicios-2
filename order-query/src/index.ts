/**
 * order-query
 * API para la consulta de ordenes desde la aplicacion web
 *
 * @author Igorov
 */

import * as Hapi from "@hapi/hapi";
import { orderQueryRoutes } from './routes/order-query.route';
import { logger } from './utils/logger';
import { HealthPlugin } from 'hapi-k8s-health'

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ["*"],
        credentials: true
      }
    }

  });

  // Registra el path /liveness y /readiness para que se puedan hacer pruebas de salud
  await server.register({
    plugin: HealthPlugin,
    options: {
      livenessProbes: {
        status: () => Promise.resolve('OK')
      },
      readinessProbes: {
        // Implementación del rediness según corresponda
        //service: () => Promise.resolve('OK')
      }
    }
  });

  // Inicia los routes
  orderQueryRoutes(server);
  // Inicia el servidor
  await server.start();
  logger.info(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

init();
