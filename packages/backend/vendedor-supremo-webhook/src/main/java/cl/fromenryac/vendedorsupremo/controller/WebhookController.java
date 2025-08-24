
package cl.fromenryac.vendedorsupremo.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import cl.fromenryac.vendedorsupremo.service.WhatsAppService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import cl.fromenryac.vendedorsupremo.service.LlmService;

import java.io.IOException;

@RestController
@RequestMapping("/webhook/whatsapp")
@Slf4j
@Tag(name = "WhatsApp Webhook")
@RequiredArgsConstructor
public class WebhookController {

    private final ObjectMapper mapper = new ObjectMapper();
    private final WhatsAppService wa;
    private final LlmService llm;

    @Value("${vendedor.whatsapp.verifyToken}")
    private String verifyToken;

    @Operation(summary = "Verificación de webhook (Meta)")
    @GetMapping
    public ResponseEntity<String> verify(@RequestParam(name="hub.mode", required=false) String mode,
                                         @RequestParam(name="hub.verify_token", required=false) String token,
                                         @RequestParam(name="hub.challenge", required=false) String challenge) {
        if ("subscribe".equals(mode) && StringUtils.hasText(token) && token.equals(verifyToken)) {
            return ResponseEntity.ok(challenge != null ? challenge : "");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid verify token");
    }
    
    @Operation(summary = "Recepción de mensajes (texto/audio)")
    @PostMapping
    public ResponseEntity<String> receive(@RequestBody String payload) {
        try {
            JsonNode root = mapper.readTree(payload);
            JsonNode entries = root.path("entry");
            if (!entries.isArray()) {
                log.warn("Invalid payload: {}", payload);
                return ResponseEntity.ok("ignored");
            }

            for (JsonNode entry : entries) {
                for (JsonNode change : entry.path("changes")) {
                    JsonNode value = change.path("value");
                    JsonNode messages = value.path("messages");
                    if (messages.isArray()) {
                        for (JsonNode msg : messages) {
                            String from = msg.path("from").asText();
                            String type = msg.path("type").asText();
                            log.info("Incoming message type={} from={}", type, from);

                            switch (type) {
                                case "text": {
                                    String text = msg.path("text").path("body").asText("");
                                    String reply = llm.generateSalesReply(from, text);
                                    wa.sendText(from, reply);
                                    break;
                                }
                                case "audio": {
                                    String mediaId = msg.path("audio").path("id").asText();
                                    if (!mediaId.isEmpty()) {
                                        byte[] audio = wa.downloadMedia(mediaId);
                                        String transcript = llm.transcribeAudio(audio);
                                        String reply = llm.generateSalesReply(from, transcript);
                                        wa.sendText(from, reply);
                                    }
                                    break;
                                }
                                default: {
                                    wa.sendText(from, "Gracias por tu mensaje. Por ahora manejo texto y audio. ¿En qué te puedo ayudar?");
                                }
                            }
                        }
                    }
                }
            }
        } catch (IOException e) {
            log.error("Error parsing webhook payload", e);
        }
        return ResponseEntity.ok("ok");
    }
}
