package cl.fromenryac.vendedorsupremo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class WhatsAppService {

    @Value("${vendedor.whatsapp.token}")
    private String token;

    @Value("${vendedor.whatsapp.phoneNumberId}")
    private String phoneNumberId;

    @Value("${vendedor.whatsapp.apiVersion}")
    private String apiVersion;

    private final ObjectMapper mapper = new ObjectMapper();

    public void sendText(String to, String text) {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            String url = String.format("https://graph.facebook.com/%s/%s/messages", apiVersion, phoneNumberId);
            HttpPost post = new HttpPost(url);
            post.addHeader("Authorization", "Bearer " + token);
            post.addHeader("Content-Type", "application/json");

            String payload = "{"
                    + "\"messaging_product\":\"whatsapp\","
                    + "\"to\":\"" + to + "\","
                    + "\"type\":\"text\","
                    + "\"text\":{\"preview_url\":false,\"body\":" + mapper.writeValueAsString(text) + "}"
                    + "}";

            post.setEntity(new StringEntity(payload, ContentType.APPLICATION_JSON));

            try (var resp = client.execute(post)) {
                log.info("WA sendText status: {}", resp.getCode());
            }
        } catch (Exception e) {
            log.error("Error sending WA text", e);
        }
    }

    public byte[] downloadMedia(String mediaId) {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            // 1) Obtener URL del media
            String metaUrl = String.format("https://graph.facebook.com/%s/%s", apiVersion, mediaId);
            HttpGet getMeta = new HttpGet(metaUrl);
            getMeta.addHeader("Authorization", "Bearer " + token);
            try (var metaResp = client.execute(getMeta);
                 InputStream metaBody = metaResp.getEntity().getContent()) {
                JsonNode meta = mapper.readTree(metaBody);
                String url = meta.path("url").asText();

                // 2) Descargar binario con Authorization
                HttpGet getBin = new HttpGet(url);
                getBin.addHeader("Authorization", "Bearer " + token);
                try (var binResp = client.execute(getBin);
                     InputStream in = binResp.getEntity().getContent()) {
                    return in.readAllBytes();
                }
            }
        } catch (Exception e) {
            log.error("Error downloading media {}", mediaId, e);
            return new byte[0];
        }
    }
}
