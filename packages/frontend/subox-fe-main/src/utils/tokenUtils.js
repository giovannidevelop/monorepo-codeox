import { jwtDecode } from "jwt-decode";

/**
 * Decodificar token JWT para extraer datos del payload
 * @param {string} token - Token JWT a decodificar
 * @returns {Object|null} - Datos del payload o null si el token no es válido
 */
export const decodeToken = (token) => {
  console.log("Decodificando token:", token);
  
    if (!token) return null;

  try {
    let decodedToken = jwtDecode(token);
    console.log("Decodificando token2:", decodedToken);
    return ; 
 
  // Decodifica el token y devuelve el payload
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

  
  /**
   * Verificar si el token JWT ha expirado
   * @param {string} token - Token JWT a verificar
   * @returns {boolean} - `true` si el token ha expirado, `false` en caso contrario
   */
  const BUFFER_SECONDS = 10;
  export const isTokenExpired = (token) => {
    if (!token) {
      console.warn("No se proporcionó un token.");
      return true; // Si no hay token, lo consideramos expirado
    }
  
    try {
      // Decodifica el token para obtener `exp`
      const { exp } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  
      const isExpired = currentTime > exp - BUFFER_SECONDS;
      if (isExpired) {
        console.log(
          `El token ha expirado. Tiempo actual: ${currentTime}, exp: ${exp}`
        );
      } else {
        console.log(
          `El token es válido. Tiempo restante: ${exp - currentTime} segundos`
        );
      }
  
      return currentTime > exp - BUFFER_SECONDS;
    } catch (error) {
      console.error("Error al verificar la expiración del token:", error);
      return true; // Si ocurre un error, considera el token como expirado
    }
  };
  