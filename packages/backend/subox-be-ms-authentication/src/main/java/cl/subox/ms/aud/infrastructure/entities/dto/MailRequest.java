package cl.subox.ms.aud.infrastructure.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
/**
 * {
    "to":"sharon.huidobro.j@gmail.com",
    "subject":"linda ",
    "body":"te quiero mucho"
    }
 */
public class MailRequest {
    private String to;         
    private String subject;    
    private String body;       
}
