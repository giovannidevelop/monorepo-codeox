package cl.subox.be.ms.mail.mail_sender.application.usecases;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import cl.subox.be.ms.mail.mail_sender.domain.model.MailModel;
import cl.subox.be.ms.mail.mail_sender.domain.ports.in.MailUseCase;
import cl.subox.be.ms.mail.mail_sender.domain.ports.out.MailPort;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class MailUseCaseImpl implements MailUseCase {

    private final JavaMailSender mailSender;
    private static final Logger logger = LoggerFactory.getLogger(MailUseCaseImpl.class);

    @Override
    public void sendMail(MailModel mailModel) {
        // Log the email sending process
        logger.info("Enviando correo a: {}", mailModel.getTo());

        // Crear mensaje de correo
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailModel.getTo());
        message.setSubject(mailModel.getSubject());
        message.setText(mailModel.getBody());

        try {
            // Enviar el correo usando JavaMailSender
            mailSender.send(message);
            logger.info("Correo enviado exitosamente a {}", mailModel.getTo());
        } catch (Exception e) {
            logger.error("Error al enviar el correo a {}: {}", mailModel.getTo(), e.getMessage());
            throw new RuntimeException("Error al enviar el correo", e);
        }

        
    }

}
