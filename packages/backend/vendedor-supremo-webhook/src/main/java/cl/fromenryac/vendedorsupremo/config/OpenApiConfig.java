package cl.fromenryac.vendedorsupremo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
  info = @Info(
    title = "Vendedor Supremo API",
    version = "0.1",
    description = "Webhook de WhatsApp + endpoints de Vendedor Supremo"
  )
)
public class OpenApiConfig {

  @Bean
  public GroupedOpenApi webhookApi() {
    return GroupedOpenApi.builder()
        .group("webhook")
        .packagesToScan("cl.fromenryac.vendedorsupremo.controller")
        .pathsToMatch("/webhook/**")
        .build();
  }
}
