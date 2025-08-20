package cl.codeox.payment.payment_core.application.services.payment.flow;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "flow")
public class FlowProps {
  private String baseUrl;
  private String apiKey;
  private String secretKey;
  private String returnUrl;
  private String confirmationUrl;

  public String getBaseUrl() { return baseUrl; }
  public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
  public String getApiKey() { return apiKey; }
  public void setApiKey(String apiKey) { this.apiKey = apiKey; }
  public String getSecretKey() { return secretKey; }
  public void setSecretKey(String secretKey) { this.secretKey = secretKey; }
  public String getReturnUrl() { return returnUrl; }
  public void setReturnUrl(String returnUrl) { this.returnUrl = returnUrl; }
  public String getConfirmationUrl() { return confirmationUrl; }
  public void setConfirmationUrl(String confirmationUrl) { this.confirmationUrl = confirmationUrl; }
}
