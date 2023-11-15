# Establecer la imagen base
FROM node:18.16.1-alpine3.17

ARG APP_DIR=/customer-bff

# Crear el directorio de trabajo
WORKDIR ${APP_DIR}

# Copiar los archivos de artefacto y los archivos necesarios
COPY dist ${APP_DIR}/dist/
COPY package.json package-lock.json ${APP_DIR}/

# Instalar las dependencias de producción
RUN npm ci --only=production

# Exponer el puerto 8080
EXPOSE 8080

# Iniciar la aplicación
CMD ["npm", "start"]
