import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productos: [],
};

export const carritoReducer = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregarProducto: (state, action) => {
      state.productos.push(action.payload);
    },
    eliminarProducto: (state, action) => {
      state.productos.splice(action.payload, 1); // Elimina por índice
    },
    limpiarCarrito: (state) => {
      state.productos = [];
    },
  },
});

export const { agregarProducto, eliminarProducto, limpiarCarrito } = carritoReducer.actions;

export default carritoReducer.reducer;
