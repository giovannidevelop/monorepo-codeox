import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarProducto, limpiarCarrito } from "./../../app/redux/reducers/carritoReducer";
import "./carrito.scss";

const Carrito = () => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito.productos);

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  const handleEliminar = (index) => {
    dispatch(eliminarProducto(index));
  };

  const handleFinalizarCompra = () => {
    dispatch(limpiarCarrito());
  };

  return (
    <div className="carrito">
      <h2>🛒 Tu carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="carrito__items">
            {carrito.map((item, index) => (
              <div key={index} className="carrito__item">
                <img src={item.imagen} alt={item.nombre} />
                <div className="carrito__item-info">
                  <h4>{item.nombre}</h4>
                  <p>${item.precio.toLocaleString("es-CL")}</p>
                </div>
                <button onClick={() => handleEliminar(index)}>🗑</button>
              </div>
            ))}
          </div>
          <div className="carrito__resumen">
            <p>Total: <strong>${total.toLocaleString("es-CL")}</strong></p>
            <button onClick={handleFinalizarCompra} className="carrito__btn">
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
