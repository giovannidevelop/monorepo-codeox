// src/component/testimonio/CarruselTestimonios.jsx
import React, { useEffect, useState } from "react";
import Testimonio from "./Testimonio";
import "./carruselTestimonios.scss";

const testimoniosData = [
  {
    nombre: "Camila R.",
    comentario: "Me encantó la ropa, llegó súper rápido y en buen estado.",
    calificacion: 5,
    imagen: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    nombre: "Javier M.",
    comentario: "Muy buena atención y los fardos valen totalmente la pena.",
    calificacion: 4,
    imagen: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    nombre: "Paola V.",
    comentario: "Mi primera compra y quedé feliz. Recomendado 100%.",
    calificacion: 5,
    imagen: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    nombre: "Paola V.",
    comentario: "Mi primera compra y quedé feliz. Recomendado 100%.",
    calificacion: 5,
    imagen: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    nombre: "Paola V.",
    comentario: "Mi primera compra y quedé feliz. Recomendado 100%.",
    calificacion: 5,
    imagen: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    nombre: "Paola V.",
    comentario: "Mi primera compra y quedé feliz. Recomendado 100%.",
    calificacion: 5,
    imagen: "https://randomuser.me/api/portraits/women/7.jpg",
  },
];

const CarruselTestimonios = () => {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % testimoniosData.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (

    <div className="home__testimonios">
      <h2>Lo que dicen nuestros clientes</h2>
      <div className="home__testimonios-grid">
        <Testimonio {...testimoniosData[indice]} />
        <Testimonio {...testimoniosData[indice + 1]} />
        <Testimonio {...testimoniosData[indice + 2]} />
      </div>
    </div>
  );
};

export default CarruselTestimonios;
