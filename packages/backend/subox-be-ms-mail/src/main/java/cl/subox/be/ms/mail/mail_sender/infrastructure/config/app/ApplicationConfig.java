package cl.subox.be.ms.mail.mail_sender.infrastructure.config.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

import cl.subox.be.ms.mail.mail_sender.application.services.MailService;
import cl.subox.be.ms.mail.mail_sender.application.usecases.MailUseCaseImpl;


@Configuration
public class ApplicationConfig {


    @Bean
    public MailService mailService(JavaMailSender mailSender) {
        MailUseCaseImpl mailUseCase = new MailUseCaseImpl(mailSender);
        return new MailService(mailUseCase);
    }

}
