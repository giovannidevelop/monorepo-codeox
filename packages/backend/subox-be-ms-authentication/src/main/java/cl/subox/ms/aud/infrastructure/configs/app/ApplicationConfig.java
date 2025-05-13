package cl.subox.ms.aud.infrastructure.configs.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import cl.subox.ms.aud.application.services.TokenService;
import cl.subox.ms.aud.application.services.UserService;
import cl.subox.ms.aud.application.usecases.TokenUseCaseImpl;
import cl.subox.ms.aud.application.usecases.UserUseCaseImpl;
import cl.subox.ms.aud.domain.ports.out.RoleRepositoryPort;
import cl.subox.ms.aud.domain.ports.out.TokenRepositoryPort;
import cl.subox.ms.aud.domain.ports.out.UserRepositoryPort;
import cl.subox.ms.aud.infrastructure.client.MailServiceClient;
import cl.subox.ms.aud.infrastructure.repository.JpaTokenRepositoryAdapter;
import cl.subox.ms.aud.infrastructure.repository.JpaUserRepositoryAdapter;

@Configuration
public class ApplicationConfig {

    @Bean
    public UserRepositoryPort userRepositoryPort(JpaUserRepositoryAdapter jpaUserRepositoryAdapter) {
        return jpaUserRepositoryAdapter;
    }
    @Bean
    public TokenRepositoryPort tokenRepositoryPort(JpaTokenRepositoryAdapter jpaTokenRepositoryAdapter) {
        return jpaTokenRepositoryAdapter;
    }
    @Bean
    public TokenService tokenService(TokenRepositoryPort tokenRepositoryPort, MailServiceClient mailServiceClient,
            UserRepositoryPort userRepositoryPort) {
        TokenUseCaseImpl tokenUseCase = new TokenUseCaseImpl(mailServiceClient, tokenRepositoryPort,
                userRepositoryPort);
        return new TokenService(tokenUseCase);
    }

    @Bean
    public UserService userService(
            UserRepositoryPort userRepositoryPort,
            RoleRepositoryPort roleRepositoryPort,
            TokenService tokenService,
            PasswordEncoder passwordEncoder) {
        UserUseCaseImpl userUseCase = new UserUseCaseImpl(userRepositoryPort, roleRepositoryPort, tokenService,
                passwordEncoder);
        return new UserService(userUseCase);
    }

}
