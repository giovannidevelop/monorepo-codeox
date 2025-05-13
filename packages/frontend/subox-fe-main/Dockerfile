# Usamos una imagen base de node para construir la aplicación
FROM node:18 AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Construimos la aplicación
RUN npm run build

# Usamos nginx para servir la aplicación en producción
FROM nginx:alpine

# Copiamos los archivos generados por el build al directorio donde nginx sirve el contenido
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto donde Nginx está sirviendo la aplicación
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]