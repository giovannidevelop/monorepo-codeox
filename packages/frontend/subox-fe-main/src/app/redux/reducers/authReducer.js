import { AUTH_TYPE } from "../types/authType";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_TYPE.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
        loading: false,
        error: null,
      };

    case AUTH_TYPE.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case AUTH_TYPE.LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
