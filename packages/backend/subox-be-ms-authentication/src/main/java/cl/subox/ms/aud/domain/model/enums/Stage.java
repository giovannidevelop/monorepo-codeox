package cl.subox.ms.aud.domain.model.enums;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Stage {
    // Etapas del proceso de registro de usuario
    OBTENER_DATOS_INICIALES_REGISTRO, // Obtener información inicial del usuario para el registro
    VALIDAR_NOMBRE_USUARIO,            // Validar que el nombre de usuario sea único y cumpla con los requisitos
    VALIDAR_CORREO_ELECTRONICO,       // Verificar que el correo electrónico ingresado sea válido y no esté en uso
    VALIDAR_PRECONDICIONES_REGISTRO,  // Validaciones adicionales previas a guardar el usuario
    GUARDAR_USUARIO,                   // Guardar la información del usuario en la base de datos
    CONFIRMAR_REGISTRO,                // Confirmar que el registro se ha realizado correctamente

    // Etapas del proceso de inicio de sesión
    OBTENER_CREDENCIALES_LOGIN,        // Obtener las credenciales (nombre de usuario y contraseña) del usuario
    VALIDAR_CREDENCIALES_LOGIN,        // Validar que las credenciales ingresadas sean correctas
    GENERAR_TOKEN_JWT,                 // Generar un token JWT que se usará para la autenticación
    DEVOLVER_RESPUESTA_LOGIN,          // Devolver la respuesta al usuario con el token y detalles relevantes

    // Otras etapas que puedes necesitar en el flujo
    VALIDACION_PRECONDICIONES,         // Validaciones generales antes de realizar ciertas acciones
    GENERACION_SESION_BIOMETRICA,     // Generación de una sesión biométrica (si aplica)
    VALIDACION_SESION_BIOMETRICA,      // Validar la sesión biométrica
    VALIDACION_RENTA,                  // Validación de la renta del usuario (si aplica)
    VALIDACION_CONTACTABILIDAD,        // Validar la capacidad de contacto del usuario
    OBTENCION_REGIONES,                // Obtener regiones relevantes para el usuario
    GENERACION_PREGUNTAS,              // Generar preguntas para la validación (si aplica)
    VALIDACION_PREGUNTAS,              // Validar respuestas a las preguntas generadas
    OBTENER_REGIONES_CON_SUCURSAL,     // Obtener regiones que tengan sucursales
    OBTENER_COMUNAS_CON_SUCURSAL,      // Obtener comunas que tengan sucursales
    OBTENCION_SUCURSAL_POR_SEGMENTO,   // Obtener sucursales según el segmento
    GENERACION_CONTRATO,               // Generar un contrato para el usuario (si aplica)
    GENERACION_CUENTA,                 // Generar una cuenta para el usuario
    VALIDACION_ESTADO_CUENTA,          // Validar el estado de la cuenta del usuario
    EVALUACION_CLIENTE_BANCA,          // Evaluar el cliente en función de criterios bancarios
    ESTADO_SITUACION;                  // Obtener el estado de situación del usuario

    Stage() {
    }

    // Método para obtener una lista de etapas a partir de una cadena de texto
    public static List<Stage> getStagesByString(String stages) {
        return Stream.of(stages.split(",", -1))
                .map(Stage::existValueOf)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    // Método privado para verificar si una cadena puede convertirse a un valor del enum
    private static Stage existValueOf(String value) {
        try {
            return valueOf(value);
        } catch (Exception var2) {
            return null;
        }
    }
}
