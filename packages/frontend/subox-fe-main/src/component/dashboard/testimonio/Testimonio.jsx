// src/component/testimonio/Testimonio.jsx
import React from "react";
import "./testimonio.scss";

const Testimonio = ({ nombre, comentario, calificacion, imagen }) => {
  return (
    <div className="testimonio">
      <img src={imagen} alt={`Foto de ${nombre}`} className="testimonio__avatar" />
      <div className="testimonio__info">
        <h4>{nombre}</h4>
        <p className="testimonio__comentario">"{comentario}"</p>
        <p className="testimonio__rating">{"⭐".repeat(calificacion)}</p>
      </div>
    </div>
  );
};

export default Testimonio;
