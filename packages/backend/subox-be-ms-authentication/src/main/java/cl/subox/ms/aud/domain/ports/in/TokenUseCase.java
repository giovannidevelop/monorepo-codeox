package cl.subox.ms.aud.domain.ports.in;

import cl.subox.ms.aud.domain.model.entities.TokenModel;

public interface TokenUseCase {
    TokenModel createVerificationToken(String username);
    boolean verifyToken(String token);
    TokenModel regenerateToken(String username);
}
