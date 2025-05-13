package cl.subox.ms.aud.infrastructure.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import cl.subox.ms.aud.domain.model.entities.RoleModel;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    @Email(message = "debe ser una dirección de correo electrónico con formato correcto")
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    private boolean isVerifiedEmail; // Campo añadido para habilitar/deshabilitar al usuario

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", 
               joinColumns = @JoinColumn(name = "user_id"), 
               inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles = new HashSet<>();

    private LocalDateTime createTime;

    /**
     * Convertir UserEntity a UserModel
     */
    public UserModel toUserModel() {
        return UserModel.builder()
                .id(this.id)
                .username(this.username)
                .email(this.email)
                .password(this.password)
                .createTime(this.createTime)
                .roles(this.roles.stream()
                        .map(RoleEntity::toRoleModel)
                        .collect(Collectors.toSet()))
                .isVerifiedEmail(this.isVerifiedEmail) // Incluir el estado habilitado
                .build();
    }

    /**
     * Convertir UserModel a UserEntity
     */
    public static UserEntity fromUserModel(UserModel userModel) {
        return UserEntity.builder()
                .id(userModel.getId())
                .username(userModel.getUsername())
                .email(userModel.getEmail())
                .password(userModel.getPassword())
                .createTime(userModel.getCreateTime())
                .roles(userModel.getRoles().stream()
                        .map(UserEntity::toRoleEntity)
                        .collect(Collectors.toSet()))
                .isVerifiedEmail(userModel.isVerifiedEmail()) // Asegúrate de establecer el estado habilitado
                .build();
    }

    /**
     * Convertir RoleModel a RoleEntity
     */
    public static RoleEntity toRoleEntity(RoleModel model) {
        return RoleEntity.builder()
                .id(model.getId())
                .name(model.getName())
                .build();
    }
}
