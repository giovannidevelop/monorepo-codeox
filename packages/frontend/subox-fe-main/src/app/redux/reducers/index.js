import { combineReducers } from 'redux';
import authReducer from './authReducer';
import pathReducer from './pathReducer';
import carritoReducer from "./carritoReducer.js";
const rootReducer = combineReducers({
    auth: authReducer,
    path: pathReducer,
    carrito: carritoReducer,
});

export default rootReducer;
