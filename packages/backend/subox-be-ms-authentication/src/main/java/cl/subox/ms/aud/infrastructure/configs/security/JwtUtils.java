package cl.subox.ms.aud.infrastructure.configs.security;

import java.util.Base64;
import java.util.Date;

import java.security.Key;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
  private int JWT_EXPIRATION_MS = 86400000;

  private String JWT_SECRET = generateRandomSecret();

  private String generateRandomSecret() {
    // Generar una cadena aleatoria de longitud 256 (que es equivalente a 32 bytes)
    String randomSecret = RandomStringUtils.random(256, true, true);
    logger.info(randomSecret);
    // Codificar la cadena en Base64 para que pueda ser utilizada como clave secreta
    String base64Secret = Base64.getEncoder().encodeToString(randomSecret.getBytes());

    return base64Secret;
  }

  public String generateJwtToken(Authentication authentication) {

    return Jwts.builder()
        .setSubject((authentication.getName()))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + JWT_EXPIRATION_MS))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_SECRET));
  }

  public String getUsernameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
        .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
}