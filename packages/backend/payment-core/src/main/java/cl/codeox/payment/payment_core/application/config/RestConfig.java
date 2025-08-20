package cl.codeox.payment.payment_core.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestConfig {
  @Bean
  public RestTemplate restTemplate() { return new RestTemplate(); }
}
