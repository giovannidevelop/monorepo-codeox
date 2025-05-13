// pathReducer.js
import {  TOGGLE_MENU, CLOSE_MENU, SET_PATHS } from "../types/pathTypes";

const initialState = {
  path: {
    HOME: {
      PRIVATE: "/private",
      PUBLIC: "/",
    },
    PROFILE: "/private/perfil",
    AUTH: {
      LOGIN: "/login",
      SIGNUP: "/registro",
      LOGOUT: "/salir",
    },
    STORE: "/tienda",
    EVENTS: "/eventos",
  },
  isMenuOpen: false, // Estado del menú
};

const pathReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATHS:
      return {
        ...state,
        path: action.payload,
      };
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case CLOSE_MENU:
      return {
        ...state,
        isMenuOpen: false,
      };
    default:
      return state;
  }
};

export default pathReducer;
