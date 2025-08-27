# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_API_AUTH=/api/auth
ARG REACT_APP_API_CLIENTES=/api/clientes
ENV REACT_APP_API_CLIENTES=$REACT_APP_API_CLIENTES
ENV REACT_APP_API_AUTH=$REACT_APP_API_AUTH
RUN npm run build --omit=dev
# Runtime
FROM nginx:alpine
# No copiamos nginx.conf; se monta por volumen desde infra
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
