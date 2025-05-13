package cl.subox.ms.aud.domain.model.entities;

import java.time.LocalDateTime;
import java.util.Set;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private Long id;
    private String username;
    private String email;
    private String password;
    private LocalDateTime createTime;
    private Set<RoleModel> roles;
    private boolean isVerifiedEmail; 
}
