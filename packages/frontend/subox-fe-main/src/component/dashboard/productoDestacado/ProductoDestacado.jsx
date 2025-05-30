// src/component/productoDestacado/ProductoDestacado.jsx
import React from "react";
import "./productoDestacado.scss";

const ProductoDestacado = ({ id, nombre, precio, imagen, onAgregar }) => {
  return (
    <div className="producto">
      <img src={imagen} alt={nombre} className="producto__img" />
      <h3 className="producto__nombre">{nombre}</h3>
      <p className="producto__precio">${precio.toLocaleString("es-CL")}</p>
      <button onClick={() => onAgregar({ id, nombre, precio, imagen })} className="producto__btn">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductoDestacado;
