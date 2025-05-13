package cl.subox.ms.aud.infrastructure.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

import cl.subox.ms.aud.domain.model.entities.TokenModel;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "verification_tokens")
public class TokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.EAGER) // Relación con UserEntity
    @JoinColumn(nullable = false, name = "user_id")
    private UserEntity user; // Relación con la entidad de usuario

    private LocalDateTime expiryDate;

    // Conversión de Entity a Model
    public TokenModel toModel() {
        return new TokenModel(
                this.id,
                this.token,
                this.user != null ? this.user.toUserModel() : null, // Conversión de UserEntity a UserModel
                this.expiryDate
        );
    }

    // Conversión de Model a Entity
    public static TokenEntity fromModel(TokenModel model) {
        if (model == null) return null;
        TokenEntity entity = new TokenEntity();
        entity.setId(model.getId());
        entity.setToken(model.getToken());
        entity.setExpiryDate(model.getExpiryDate());
        entity.setUser(UserEntity.fromUserModel(model.getUser())); // Conversión de UserModel a UserEntity
        return entity;
    }
}
