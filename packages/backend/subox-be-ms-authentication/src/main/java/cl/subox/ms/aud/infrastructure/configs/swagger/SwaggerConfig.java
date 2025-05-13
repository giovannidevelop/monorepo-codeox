package cl.subox.ms.aud.infrastructure.configs.swagger;


import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.http.HttpHeaders;
@Configuration
@SecurityScheme(
        name = "Security Token",
        description = "Access Token For My API",
        type = SecuritySchemeType.HTTP,
        paramName = HttpHeaders.AUTHORIZATION,
        in = SecuritySchemeIn.HEADER,
        scheme = "bearer",
        bearerFormat = "JWT"
)
@OpenAPIDefinition(
        info = @Info(
                title = "API AUTHENTICATION",
                description = "aplicacion para registrar usuarios ",
                termsOfService = "#/terminos_y_condiciones",
                version = "1.0.0",
                contact = @Contact(
                        name = "Giovanni Poblete",
                        url = "#",
                        email = "giovannipoblete55@gmail.com"
                )
        ),
        servers = {
                @Server(
                        description = "DEVELOP",
                        url = "http://localhost:7000"
                ),
                @Server(
                        description = "PRODUCTION",
                        url = "http://elperita:7000"
                )
        },
        security = @SecurityRequirement(
                name = "Security Token"
        )
)
public class SwaggerConfig {

   
}
