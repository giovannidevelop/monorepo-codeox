  import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
  import { useAuth } from "../provider/AuthProvider";
  import Home from "./../pages/home/Home";
  import Dashboard from "./../pages/dashboard/Dashboard";
  import Events from "./../pages/Events";
  import Register from "./../pages/auth/register/Register";
  import Login from "./../pages/auth/login/Login";
  import NotFound from "./../pages/NotFound";
  import NavBarWrapper from "./NavBarWrapper";
  import Store from "../pages/store/Store";
  import Profile from "./../pages/Profile";
  import Inventory from "./../pages/inventario/Inventory";

  import { PATH } from "./path";
  import ProtectedRoute from "./ProtectedRoute";
  import Carrito from "../component/dashboard/carrito/Carrito";
import DetalleProducto from "../pages/store/components/DetalleProducto";

  const Routes = () => {
    const { isAuthenticated } = useAuth();

    const routesForPublic = [
      { path: PATH.HOME, element: <Home /> },
      { path: PATH.STORE, element: <Store /> },
      { path: PATH.CARRITO, element: <Carrito /> },
      { path: PATH.INVENTORY, element: <Inventory /> },
      { path: PATH.EVENTS, element: <Events /> },
      { path: "/producto/:id", element: <DetalleProducto/> },
    ];

    const routesForNotAuthenticatedOnly = [
      { path: PATH.LOGIN, element: isAuthenticated ? <Navigate to={PATH.DASHBOARD} replace /> : <Login /> },
      { path: PATH.SIGNUP, element: isAuthenticated ? <Navigate to={PATH.DASHBOARD} replace /> : <Register /> },
    ];

    const routesForAuthenticatedOnly = [
      {
        path: PATH.DASHBOARD,
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "inventory", element: <Inventory /> }, 
          { path: PATH.PROFILE, element: <Profile /> },
        ],
      },
    ];

    const router = createBrowserRouter([
      {
        path: "/",
        element: <NavBarWrapper />,
        children: [
          ...routesForPublic,
          ...routesForNotAuthenticatedOnly,
          ...routesForAuthenticatedOnly,
          { path: "*", element: <NotFound /> },
        ],
      },
    ]);

    return <RouterProvider router={router} />;
  };

  export default Routes;
