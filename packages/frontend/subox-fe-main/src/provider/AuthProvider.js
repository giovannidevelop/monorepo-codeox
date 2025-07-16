import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isTokenExpired } from "../utils/tokenUtils";
import { AUTH_ACTIONS } from "../app/redux/actions/authActions";

// Contexto
const AuthContext = createContext();

// Proveedor
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Leemos directamente desde Redux (que ya está persistido)
  const { token, user } = useSelector((state) => state.auth);
  const [authMessage, setAuthMessage] = useState(null);

  const isAuthenticated =
    !!token && !isTokenExpired(token?.replace("Bearer ", ""));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const showMessage = (type, text) => {
    setAuthMessage({ type, text });
    setTimeout(() => setAuthMessage(null), 4000);
  };

  const handleLogout = () => {
    dispatch(AUTH_ACTIONS.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    showMessage("info", "Sesión cerrada correctamente.");
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      token,
      authMessage,
      handleLogout,
    }),
    [isAuthenticated, user, token, authMessage]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar en toda la app
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
};

export default AuthProvider;
