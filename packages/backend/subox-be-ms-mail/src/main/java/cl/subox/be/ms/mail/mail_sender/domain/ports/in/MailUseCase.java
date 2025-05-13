package cl.subox.be.ms.mail.mail_sender.domain.ports.in;

import cl.subox.be.ms.mail.mail_sender.domain.model.MailModel;

public interface MailUseCase {
    void sendMail(MailModel mailModel);
}