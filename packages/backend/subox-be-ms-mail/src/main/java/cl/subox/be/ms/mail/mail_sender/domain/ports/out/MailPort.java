package cl.subox.be.ms.mail.mail_sender.domain.ports.out;

import cl.subox.be.ms.mail.mail_sender.domain.model.MailModel;


public interface MailPort {

    void sendMail(MailModel mailModel);
}