Vendedor Supremo — Webhook WhatsApp (Spring Boot)

MVP para recibir mensajes de WhatsApp (Cloud API), responder con IA y soportar audio (descarga y transcripción posterior).

Requisitos:
- Java 17
- Maven 3.9+
- Credenciales de WhatsApp Cloud API (Bearer Token, Phone Number ID) y Verify Token para el webhook.
- Exponer http://<tu-host>/webhook/whatsapp públicamente (ngrok/Cloud Run/EC2/Nginx).

Variables (application.yml / env): WHATSAPP_VERIFY_TOKEN, WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, META_API_VERSION, OPENAI_API_KEY (opcional).

Correr local: mvn spring-boot:run

Verificación Webhook (GET): Meta enviará hub.mode, hub.verify_token y hub.challenge a /webhook/whatsapp.
Recepción de mensajes (POST): texto y audio con stubs.
Envío de mensajes: POST https://graph.facebook.com/{version}/{phoneNumberId}/messages.

Próximos pasos: orquestación LLM real, persistencia MySQL, máquina de estados de venta, plantillas, flujos, pagos.
