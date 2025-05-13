// pathsActions.js
import { SET_PATHS, TOGGLE_MENU, CLOSE_MENU } from "./../types/pathTypes";

// Acción para actualizar las rutas
const setPaths = (paths) => ({
  type: SET_PATHS,
  payload: paths,
});

// Acción para alternar el menú
const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

// Acción para cerrar el menú
const closeMenu = () => ({
  type: CLOSE_MENU,
});


export const PATH_ACTIONS = {
  setPaths,
  toggleMenu,
  closeMenu
}