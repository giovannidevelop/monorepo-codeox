package cl.subox.ms.aud.infrastructure.entities.dto;


import lombok.Data;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
public class RegistrarUsuarioDTO {
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;
  @JsonIgnore
  private Set<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

}
