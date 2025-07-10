import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { PATH } from "./path";

const ProtectedRoute = () => {
  const { isAuthenticated, loadingAuth } = useAuth(); // `loadingAuth` indica si aún se está validando
  const location = useLocation();

  // Mientras se valida la sesión, puedes mostrar un loader o nada
  if (loadingAuth) {
    return <div>Cargando autenticación...</div>; // puedes usar un spinner aquí si tienes uno
  }

  // Si está autenticado, renderiza la ruta protegida
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Si NO está autenticado, redirige a login y guarda la ruta original
  return <Navigate to={PATH.LOGIN} replace state={{ from: location }} />;
};

export default ProtectedRoute;
