# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Usa misma-origin: el FE hablará con /api (proxy en nginx)
ARG REACT_APP_API_BASE=/api
ARG REACT_APP_PAYMENTS_PREFIX=/api/payments
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
ENV REACT_APP_PAYMENTS_PREFIX=$REACT_APP_PAYMENTS_PREFIX
RUN npm run build

# Nginx (sirve FE + proxy /api -> payment-core:5007)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
