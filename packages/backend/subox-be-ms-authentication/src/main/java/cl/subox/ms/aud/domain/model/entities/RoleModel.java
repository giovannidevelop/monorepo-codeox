package cl.subox.ms.aud.domain.model.entities;

import cl.subox.ms.aud.domain.model.enums.ERole;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleModel {
    private Long id;
    private ERole name;
}
