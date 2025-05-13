package cl.subox.ms.aud.domain.model.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenModel {

    private Long id; // Este campo puede o no estar presente, depende del contexto del dominio
    private String token;
    private UserModel user; // Usuario asociado
    private LocalDateTime expiryDate;

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
    
}
