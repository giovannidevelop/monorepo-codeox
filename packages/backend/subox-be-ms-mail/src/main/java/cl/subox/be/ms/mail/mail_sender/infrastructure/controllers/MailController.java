package cl.subox.be.ms.mail.mail_sender.infrastructure.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cl.subox.be.ms.mail.mail_sender.application.services.MailService;
import cl.subox.be.ms.mail.mail_sender.domain.model.MailModel;


@RestController
@RequestMapping("/api/mail")
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody MailModel mailModel) {
        mailService.sendMail(mailModel);
        return ResponseEntity.ok("Correo enviado exitosamente");
    }
}