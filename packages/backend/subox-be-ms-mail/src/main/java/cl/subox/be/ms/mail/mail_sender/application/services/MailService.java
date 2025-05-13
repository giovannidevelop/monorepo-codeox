package cl.subox.be.ms.mail.mail_sender.application.services;

import cl.subox.be.ms.mail.mail_sender.application.usecases.MailUseCaseImpl;
import cl.subox.be.ms.mail.mail_sender.domain.model.MailModel;
import cl.subox.be.ms.mail.mail_sender.domain.ports.in.MailUseCase;
import lombok.Data;


@Data
public class MailService implements MailUseCase{

    private final MailUseCaseImpl mailUseCase;

    @Override
    public void sendMail(MailModel mailModel) {
         mailUseCase.sendMail(mailModel);
    }
}
