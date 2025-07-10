import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";
import { AUTH_ACTIONS } from "../app/redux/actions/authActions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authMessage, setAuthMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // 👈 nuevo
  const dispatch = useDispatch();

  // 🧠 Función para mostrar mensajes de estado
  const showMessage = (type, text) => {
    setAuthMessage({ type, text });
    console.log(`Mensaje [${type.toUpperCase()}]:`, text);
    setTimeout(() => setAuthMessage(null), 5000);
  };

  // ✅ Cargar sesión desde localStorage al montar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedToken && !isTokenExpired(storedToken.replace("Bearer ", ""))) {
      setToken(storedToken);
      setUser(storedUser);
      axios.defaults.headers.common["Authorization"] = storedToken;
      dispatch(AUTH_ACTIONS.loginSuccess({ user: storedUser, token: storedToken }));
    } else {
      // Elimina datos expirados o inválidos
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    setLoadingAuth(false);
  }, [dispatch]);

  const isAuthenticated = !!token && !isTokenExpired(token.replace("Bearer ", ""));

  // 💾 Guardar token
  const saveToken = (newToken) => {
    if (!newToken) {
      showMessage("error", "Token inválido. No se pudo guardar.");
      return null;
    }

    const fullToken = `Bearer ${newToken}`;
    localStorage.setItem("token", fullToken);
    axios.defaults.headers.common["Authorization"] = fullToken;
    setToken(fullToken);
    return fullToken;
  };

  // 💾 Guardar usuario
  const saveUser = (user) => {
    if (!user) {
      showMessage("error", "Datos de usuario inválidos. No se pudo guardar.");
      return null;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return user;
  };

  // 🔁 Sincronizar con Redux
  const syncUserWithRedux = (userData, fullToken) => {
    if (!userData || !fullToken) {
      showMessage("error", "Faltan datos del usuario o el token.");
      return;
    }
    dispatch(AUTH_ACTIONS.loginSuccess({ user: userData, token: fullToken }));
  };

  // 🔐 Login
  const handleLogin = async (username, password) => {
    if (!username || !password) {
      showMessage("warning", "Por favor, ingresa un usuario y contraseña.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", { username, password });
      if (response.status !== 200) throw new Error("Error en la autenticación");

      const { token, user } = response.data;
      if (!token || !user) throw new Error("Respuesta de autenticación inválida.");

      const fullToken = saveToken(token);
      const savedUser = saveUser(user);

      if (!savedUser) {
        showMessage("error", "Error al guardar el usuario. Cerrando sesión.");
        return;
      }

      syncUserWithRedux(savedUser, fullToken);
      showMessage("success", "Sesión iniciada con éxito.");
    } catch (error) {
      showMessage("error", error.response?.data?.message || "Error en la autenticación.");
    }
  };

  // 🔓 Logout
  const handleLogout = () => {
    showMessage("info", "Has cerrado sesión correctamente.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    dispatch(AUTH_ACTIONS.logout());
  };

  // 🧠 Valor del contexto
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      loadingAuth,
      token,
      user,
      authMessage,
      handleLogin,
      handleLogout,
    }),
    [isAuthenticated, loadingAuth, token, user, authMessage]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export default AuthProvider;
