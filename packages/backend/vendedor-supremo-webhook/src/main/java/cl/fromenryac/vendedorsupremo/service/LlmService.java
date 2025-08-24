
package cl.fromenryac.vendedorsupremo.service;

import org.springframework.stereotype.Service;

@Service
public class LlmService {

    public String generateSalesReply(String userId, String message) {
        String lower = message == null ? "" : message.toLowerCase();
        if (lower.contains("precio") || lower.contains("vale")) {
            return "Nuestro plan Starter está a $110.000 CLP al contado (hoy -25%). ¿Deseas que te envíe el link de pago o una demo rápida?";
        }
        if (lower.contains("hola") || lower.contains("buenas")) {
            return "¡Hola! Soy Vendedor Supremo 🤖. Te ayudo a elegir el plan ideal y te doy el link de pago cuando estés listo. ¿Qué necesitas?";
        }
        return "Entiendo. Para ayudarte mejor, ¿qué rubro es tu negocio y en qué ciudad estás? Así te recomiendo el plan y te envío un ejemplo.";
    }

    public String transcribeAudio(byte[] audio) {
        return "[transcripción pendiente de audio]";
    }
}
