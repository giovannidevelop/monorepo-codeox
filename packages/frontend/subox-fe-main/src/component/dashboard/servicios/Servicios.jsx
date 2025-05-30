import React from "react";
import { FaTruck, FaWhatsapp, FaTags, FaShieldAlt } from "react-icons/fa";
import "./servicios.scss";

const servicios = [
  {
    icon: <FaTruck />,
    titulo: "Envíos a todo Chile",
    descripcion: "Despacho rápido y seguro a cualquier región."
  },
  {
    icon: <FaWhatsapp />,
    titulo: "Atención por WhatsApp",
    descripcion: "Resolvemos tus dudas al instante, sin compromiso."
  },
  {
    icon: <FaTags />,
    titulo: "Fardos seleccionados",
    descripcion: "Revisados uno a uno para máxima calidad."
  },
  {
    icon: <FaShieldAlt />,
    titulo: "Compra segura",
    descripcion: "Protección y garantía en cada pedido."
  }
];

const Servicios = () => {
  return (
    <section className="servicios">
      <h2>Nuestros servicios</h2>
      <div className="servicios__grid">
        {servicios.map((s, i) => (
          <div className="servicios__card" key={i}>
            <div className="servicios__icon">{s.icon}</div>
            <h3>{s.titulo}</h3>
            <p>{s.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;
