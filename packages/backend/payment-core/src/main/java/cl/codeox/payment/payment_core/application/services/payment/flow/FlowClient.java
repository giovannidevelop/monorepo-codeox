package cl.codeox.payment.payment_core.application.services.payment.flow;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class FlowClient {
  private final RestTemplate http;
  private final String baseUrl, apiKey, secret, urlReturn, urlConfirmation;

  public FlowClient(RestTemplate http, FlowProps p) {
    this.http = http;
    this.baseUrl = p.getBaseUrl();
    this.apiKey = p.getApiKey();
    this.secret = p.getSecretKey();
    this.urlReturn = p.getReturnUrl();
    this.urlConfirmation = p.getConfirmationUrl();
  }

  public CreateOrderResp createOrder(String commerceOrder, String subject, BigDecimal amount, String email, Integer paymentMethod) {
    Map<String,String> p = new HashMap<>();
    p.put("apiKey", apiKey);
    p.put("commerceOrder", commerceOrder);
    p.put("subject", subject);
    p.put("currency", "CLP");
    p.put("amount", amount.toPlainString());
    if (email != null && !email.isBlank()) p.put("email", email);
    if (paymentMethod != null) p.put("paymentMethod", paymentMethod.toString());
    p.put("urlConfirmation", urlConfirmation);
    p.put("urlReturn", urlReturn);
    p.put("s", FlowSigner.sign(p, secret));

    HttpHeaders h = new HttpHeaders();
    h.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
    p.forEach(body::add);

    ResponseEntity<CreateOrderResp> r = http.postForEntity(
        baseUrl + "/payment/create", new HttpEntity<>(body, h), CreateOrderResp.class);

    return r.getBody();
  }

  public StatusResp getStatusByToken(String token) {
    Map<String,String> q = new HashMap<>();
    q.put("apiKey", apiKey);
    q.put("token", token);
    q.put("s", FlowSigner.sign(q, secret));

    String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/payment/getStatus")
      .queryParam("apiKey", q.get("apiKey"))
      .queryParam("token", q.get("token"))
      .queryParam("s", q.get("s"))
      .toUriString();

    return http.getForObject(url, StatusResp.class);
  }

  // --- DTOs simples para las respuestas ---
  public static class CreateOrderResp {
    public String url;
    public String token;
    public Long flowOrder;
  }
  public static class StatusResp {
    public Long flowOrder;
    public String commerceOrder;
    public String requestDate;
    public Integer status; // 1 pendiente, 2 pagada, 3 rechazada, 4 anulada
    public String subject;
    public String currency;
    public Double amount;
    public String payer;
  }
}
