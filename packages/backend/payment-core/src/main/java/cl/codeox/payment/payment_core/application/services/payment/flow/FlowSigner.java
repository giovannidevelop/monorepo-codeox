package cl.codeox.payment.payment_core.application.services.payment.flow;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class FlowSigner {
  public static String sign(Map<String, String> params, String secret) {
    Map<String, String> toSign = new HashMap<>(params);
    toSign.remove("s");
    List<String> keys = new ArrayList<>(toSign.keySet());
    Collections.sort(keys);
    StringBuilder sb = new StringBuilder();
    for (String k : keys) sb.append(k).append(toSign.get(k));
    try {
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
      byte[] raw = mac.doFinal(sb.toString().getBytes(StandardCharsets.UTF_8));
      StringBuilder hex = new StringBuilder();
      for (byte b : raw) hex.append(String.format("%02x", b));
      return hex.toString();
    } catch (Exception e) {
      throw new RuntimeException("Error firmando parámetros", e);
    }
  }
}
