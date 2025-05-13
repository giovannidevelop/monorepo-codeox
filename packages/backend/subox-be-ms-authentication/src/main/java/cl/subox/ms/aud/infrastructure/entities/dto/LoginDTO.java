package cl.subox.ms.aud.infrastructure.entities.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String username;
    private String password;
}