package cl.subox.ms.aud.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import cl.subox.ms.aud.infrastructure.entities.dto.MailRequest;

@FeignClient(name = "mail-sender", url = "http://localhost:9099") // Reemplaza con el nombre o URL del microservicio de correos
public interface MailServiceClient {

    @PostMapping("/api/mail/send")
    void sendVerificationEmail(@RequestBody MailRequest mailRequest);
}
