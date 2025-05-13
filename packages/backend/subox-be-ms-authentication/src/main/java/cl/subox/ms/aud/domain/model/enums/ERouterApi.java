package cl.subox.ms.aud.domain.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpMethod;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum ERouterApi {

    // API para obtener datos iniciales del usuario
    API_OBTENER_DATOS_INICIALES(
            "/registro/inicial",
            HttpMethod.POST,
            null,
            List.of(Stage.OBTENER_DATOS_INICIALES_REGISTRO)),

    // API para validar el nombre de usuario
    API_VALIDAR_NOMBRE_USUARIO(
            "/registro/nombre-usuario",
            HttpMethod.POST,
            List.of(Stage.OBTENER_DATOS_INICIALES_REGISTRO),
            List.of(Stage.VALIDAR_NOMBRE_USUARIO)),

    // API para validar el correo electrónico
    API_VALIDAR_CORREO_ELECTRONICO(
            "/registro/correo",
            HttpMethod.POST,
            List.of(Stage.VALIDAR_NOMBRE_USUARIO),
            List.of(Stage.VALIDAR_CORREO_ELECTRONICO)),

    // API para validar las precondiciones antes de guardar el usuario
    API_VALIDAR_PRECONDICIONES(
            "/registro/precondiciones",
            HttpMethod.POST,
            List.of(Stage.VALIDAR_CORREO_ELECTRONICO),
            List.of(Stage.VALIDAR_PRECONDICIONES_REGISTRO)),

    // API para guardar la información del usuario
    API_GUARDAR_USUARIO(
            "/registro/guardar",
            HttpMethod.POST,
            List.of(Stage.VALIDAR_PRECONDICIONES_REGISTRO),
            List.of(Stage.CONFIRMAR_REGISTRO)),

    // API para confirmar que el registro se ha realizado correctamente
    API_CONFIRMAR_REGISTRO(
            "/registro/confirmar",
            HttpMethod.GET,
            List.of(Stage.CONFIRMAR_REGISTRO),
            null), // No hay etapas de salida en este caso

    // API para obtener las credenciales para iniciar sesión
    API_OBTENER_CREDENCIALES_LOGIN(
            "/login/credenciales",
            HttpMethod.POST,
            List.of(Stage.CONFIRMAR_REGISTRO),
            List.of(Stage.OBTENER_CREDENCIALES_LOGIN)),

    // API para validar las credenciales de inicio de sesión
    API_VALIDAR_CREDENCIALES_LOGIN(
            "/login/validar",
            HttpMethod.POST,
            List.of(Stage.OBTENER_CREDENCIALES_LOGIN),
            List.of(Stage.VALIDAR_CREDENCIALES_LOGIN)),

    // API para generar un token JWT después de un inicio de sesión exitoso
    API_GENERAR_TOKEN_JWT(
            "/login/token",
            HttpMethod.GET,
            List.of(Stage.VALIDAR_CREDENCIALES_LOGIN),
            List.of(Stage.GENERAR_TOKEN_JWT)),

    // API para devolver la respuesta al usuario con el token y detalles
    API_DEVOLVER_RESPUESTA_LOGIN(
            "/login/respuesta",
            HttpMethod.GET,
            List.of(Stage.GENERAR_TOKEN_JWT),
            null); // No hay etapas de salida en este caso

    private static final Map<String, ERouterApi> apis = new HashMap<>();
    private static final Map<String, List<Stage>> mapPermitidos = new HashMap<>();
    private static final Map<String, List<Stage>> mapSalidas = new HashMap<>();

    static {
        Arrays.stream(ERouterApi.values()).forEach(
                p -> {
                    mapPermitidos.put(p.path, p.getStagesPermitidos());
                    mapSalidas.put(p.path, p.getStageSalida());
                    apis.put(p.getMethod().toString() + ":" + p.path, p);
                }
        );
    }

    private final String path; // Ruta de la API
    private final HttpMethod method; // Método HTTP de la API
    private final List<Stage> stagesPermitidos; // Etapas permitidas antes de acceder a la API
    private final List<Stage> stageSalida; // Etapas que resultan de acceder a la API

    // Método para obtener la API según la ruta y el método HTTP
    public static ERouterApi getApiByPath(String path, HttpMethod method) {
        return apis.get(method.toString() + ":" + path);
    }
}
