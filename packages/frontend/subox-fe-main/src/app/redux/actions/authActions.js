import axios from "axios";
import { AUTH_TYPE } from "./../types/authType";
import { isTokenExpired } from "../../../utils/tokenUtils";
import PATH from "../../../router/path";

// URLs para autenticación
const BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

const URL_AUTH_LOGIN = BASE_URL + "login";
const URL_AUTH_REGISTER = BASE_URL + "register";

// Acción para iniciar sesión
const login = (formData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_TYPE.LOGIN_REQUEST });

    try {
      let loginData = {
        username: formData.login_user_temp,
        password: formData.login_pass_temp,
      };
      const response = await axios.post(URL_AUTH_LOGIN, loginData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.data) {

        const { token, id, username, email, roles } = response.data.data;

        if (isTokenExpired(token)) {
          console.warn("El token recibido ya ha expirado.");
          throw new Error("El token recibido ya ha expirado.");
        }

        // Crear datos del usuario
        const userData = { id, username, email, roles };

        navigate(PATH.DASHBOARD, { replace: true });
      } else {
        console.error("Error en la respuesta del servidor:", response.data.message);
        dispatch({
          type: AUTH_TYPE.LOGIN_FAILURE,
          payload: response.data.message || "Error en las credenciales.",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error inesperado al conectar con el servidor.";
      console.error("Error durante el login:", errorMessage);
      dispatch({
        type: AUTH_TYPE.LOGIN_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

/**
 * Acción para registrar un usuario
 */
const register = (registerData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_TYPE.REGISTER_REQUEST });

    try {
      const response = await axios.post(URL_AUTH_REGISTER, registerData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        dispatch({ type: AUTH_TYPE.REGISTER_SUCCESS });
        navigate(PATH.LOGIN, { replace: true });
      } else {
        dispatch({
          type: AUTH_TYPE.REGISTER_FAILURE,
          payload: "Error al registrar usuario.",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error inesperado.";
      dispatch({
        type: AUTH_TYPE.REGISTER_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

/**
 * Acción para cerrar sesión
 */
const logout = () => {
  return (dispatch) => {
    dispatch({ type: AUTH_TYPE.LOGOUT });
  };
};


// Acción para manejar el inicio de sesión exitoso
export const loginSuccess = (payload) => ({
  type: AUTH_TYPE.LOGIN_SUCCESS,
  payload,
});



export const AUTH_ACTIONS = {
  login,
  register,
  logout,
  loginSuccess,
}