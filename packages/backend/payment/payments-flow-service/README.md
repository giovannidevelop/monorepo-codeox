# payments-flow-service

Microservicio **Spring Boot** para integrar **Flow** (Chile) con endpoints para crear órdenes,
recibir la confirmación (webhook) y consultar el estado de pago.

## Endpoints

- `POST /api/payments/flow/create-order` → Crea una orden en Flow y retorna `paymentUrl` para redirigir al checkout.
- `POST /api/payments/flow/webhook` → Webhook de Flow (urlConfirmation). Recibe `token`, consulta estado y **persiste** el pago.
- `POST /api/payments/flow/return` → URL de retorno (urlReturn). Recibe `token` y responde con un texto simple; puedes redirigir a tu FE.
- `GET  /api/payments/flow/status/{commerceOrder}` → Lee el último estado persistido de una orden.

> Por defecto usa **H2 (file)** en `./data/payments-db` (se persiste en disco). Puedes cambiar a MySQL/MariaDB con variables.

## Variables de entorno

| Variable | Ejemplo / default |
|---|---|
| `FLOW_BASE_URL` | `https://sandbox.flow.cl/api` |
| `FLOW_API_KEY` | `tu_api_key` |
| `FLOW_SECRET_KEY` | `tu_secret_key` |
| `FLOW_RETURN_URL` | `http://localhost:8080/api/payments/flow/return` |
| `FLOW_CONFIRMATION_URL` | `http://localhost:8080/api/payments/flow/webhook` |
| `PORT` | `8080` |
| `DB_URL` | `jdbc:h2:file:./data/payments-db` *(default)* |
| `DB_USER` | `sa` *(default)* |
| `DB_PASSWORD` | *(vacío)* |
| `DB_DRIVER` | `org.h2.Driver` *(default)* |

### MySQL/MariaDB (opcional)

Ejemplo de variables para producción:

```bash
export DB_URL='jdbc:mysql://mysql:3306/payments?useSSL=false&serverTimezone=UTC'
export DB_USER='payments'
export DB_PASSWORD='supersecret'
export DB_DRIVER='com.mysql.cj.jdbc.Driver'
```

## Correr local

```bash
# Requisitos: Java 17 y Maven
mvn spring-boot:run
```

Luego prueba creando una orden:

```bash
curl -X POST http://localhost:8080/api/payments/flow/create-order   -H "Content-Type: application/json"   -d '{"subject":"Plan Web Básico","amount":110000,"email":"cliente@ejemplo.cl"}'
```

Respuesta:
```json
{
  "paymentUrl":"https://sandbox.flow.cl/app/web/pay.php?token=...",
  "token":"...",
  "flowOrder":123456,
  "commerceOrder":"ORD-..."
}
```

Abre `paymentUrl` para pagar en Sandbox. Flow enviará `POST token=...` a:
- `FLOW_CONFIRMATION_URL` (webhook) y
- `FLOW_RETURN_URL` (retorno por navegador).

## Compilar y empaquetar

```bash
mvn -DskipTests package
java -jar target/payments-flow-service-0.1.0.jar
```

## Docker

```bash
# 1) Construir imagen
docker build -t codeox/payments-flow-service:0.1.0 .

# 2) Levantar con MySQL (docker-compose)
docker compose -f docker-compose.yml up -d
```

### Variables para `docker compose` (crear `.env` o exportar)

```env
FLOW_BASE_URL=https://sandbox.flow.cl/api
FLOW_API_KEY=tu_api_key
FLOW_SECRET_KEY=tu_secret_key
FLOW_RETURN_URL=http://localhost:8080/api/payments/flow/return
FLOW_CONFIRMATION_URL=http://localhost:8080/api/payments/flow/webhook

DB_URL=jdbc:mysql://mysql:3306/payments?useSSL=false&serverTimezone=UTC
DB_USER=payments
DB_PASSWORD=supersecret
DB_DRIVER=com.mysql.cj.jdbc.Driver

PORT=8080
```

## Postman (cURL rápido)

- `POST /api/payments/flow/create-order`
- `GET /api/payments/flow/status/{commerceOrder}`

## Licencia

MIT
