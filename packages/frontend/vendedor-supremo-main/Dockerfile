# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_API_BASE=/api
ARG REACT_APP_PAYMENTS_PREFIX=/api/payments
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
ENV REACT_APP_PAYMENTS_PREFIX=$REACT_APP_PAYMENTS_PREFIX
RUN npm run build --omit=dev

# Runtime
FROM nginx:alpine
# No copiamos nginx.conf; se monta por volumen desde infra
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
