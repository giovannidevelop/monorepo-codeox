package cl.subox.ms.aud.application.services;

import cl.subox.ms.aud.application.usecases.TokenUseCaseImpl;
import cl.subox.ms.aud.domain.model.entities.TokenModel;
import cl.subox.ms.aud.domain.ports.in.TokenUseCase;
import lombok.Data;

@Data
public class TokenService implements TokenUseCase {

    private final TokenUseCaseImpl userUseCase;

    @Override
    public TokenModel createVerificationToken(String username) {
        return userUseCase.createVerificationToken(username);
    }

    @Override
    public boolean verifyToken(String token) {
        return userUseCase.verifyToken(token);
    }

    @Override
    public TokenModel regenerateToken(String username) {
        return userUseCase.regenerateToken(username);
    }

}
