// src/component/trabajo/TrabajaConNosotros.jsx
import React from "react";
import "./trabaja.scss";

const TrabajaConNosotros = () => {
  return (
    <section className="trabaja">
      <div className="trabaja__contenido">
        <h2>¿Quieres trabajar con nosotros?</h2>
        <p>
          Si te apasiona la moda, tienes habilidades en ventas o logística,
          o simplemente te gustaría revender nuestros productos, ¡escríbenos!
        </p>
        <a
          href="https://wa.me/56912345678?text=Hola%2C%20estoy%20interesado%20en%20trabajar%20con%20Fashion%20Fardos"
          target="_blank"
          rel="noreferrer"
          className="trabaja__boton"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default TrabajaConNosotros;
