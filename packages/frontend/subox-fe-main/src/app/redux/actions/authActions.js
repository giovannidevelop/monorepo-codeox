import axios from "axios";
import { AUTH_TYPE } from "../types/authType";
import { isTokenExpired } from "../../../utils/tokenUtils";
import PATH from "../../../router/path";
import { endpoints } from "../../../config/api";


// Guardar token y user en localStorage
const persistAuthData = (token, user) => {
  console.log("Persistiendo datos de autenticación:", { token, user });
  
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Acción: login
const login = (formData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_TYPE.LOGIN_REQUEST });

    try {
      const loginData = {
        username: formData.login_user_temp,
        password: formData.login_pass_temp,
      };

      const { data, status } = await axios.post(endpoints.auth.login(), loginData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Respuesta del servidor:", data);

      if (status === 200 && data?.token) {
        const { token, id, username, email, roles } = data;

        if (!token || !username) {
          throw new Error("Datos de autenticación incompletos.");
        }

        if (isTokenExpired(token)) {
          console.warn("El token recibido ya ha expirado.");
          throw new Error("El token ha expirado.");
        }

        const userData = { id, username, email, roles };
        console.log("Datos del usuario:", userData);
        
        persistAuthData(token, userData);

        dispatch(loginSuccess({ token, ...userData }));
        navigate(PATH.DASHBOARD, { replace: true });
      } else {
        dispatch({
          type: AUTH_TYPE.LOGIN_FAILURE,
          payload: data?.message || "Credenciales incorrectas.",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error al iniciar sesión.";
      console.error("Error durante el login:", errorMessage);
      dispatch({
        type: AUTH_TYPE.LOGIN_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// Acción: register
const register = (registerData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_TYPE.REGISTER_REQUEST });

    try {
      const { status } = await axios.post(endpoints.auth.register(), registerData, {
        headers: { "Content-Type": "application/json" },
      });

      if (status === 201) {
        dispatch({ type: AUTH_TYPE.REGISTER_SUCCESS });
        navigate(PATH.LOGIN, { replace: true });
      } else {
        dispatch({
          type: AUTH_TYPE.REGISTER_FAILURE,
          payload: "No se pudo registrar el usuario.",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error al registrar usuario.";
      dispatch({
        type: AUTH_TYPE.REGISTER_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// Acción: logout
const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];

    dispatch({ type: AUTH_TYPE.LOGOUT });
  };
};

// Acción: login success
export const loginSuccess = (payload) => ({
  type: AUTH_TYPE.LOGIN_SUCCESS,
  payload,
});

export const AUTH_ACTIONS = {
  login,
  register,
  logout,
  loginSuccess,
};
