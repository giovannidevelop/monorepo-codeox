package cl.subox.ms.aud.infrastructure.entities;

import javax.persistence.*;

import cl.subox.ms.aud.domain.model.entities.RoleModel;
import cl.subox.ms.aud.domain.model.enums.ERole;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class RoleEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ERole name;

  /**
   * Convertir RoleEntity a RoleModel
   */
  public RoleModel toRoleModel() {
    return RoleModel.builder()
        .id(this.id)
        .name(this.name)
        .build();
  }

  /**
   * Convertir RoleModel a RoleEntity
   */
  public static RoleEntity fromRoleModel(RoleModel model) {
    return RoleEntity.builder()
        .id(model.getId())
        .name(model.getName())
        .build();
  }
}
