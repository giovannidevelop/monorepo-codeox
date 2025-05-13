import React, { useState, useEffect } from "react";
import "./galeriaInstagram.scss";

const GaleriaInstagram = () => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const res = await fetch("/data/instagramGaleria.json");
        const data = await res.json();
        const duplicadas = [...data, ...data.slice(0, 2)];
        setImagenes(duplicadas);
      } catch (err) {
        console.error("Error al cargar la galería de Instagram:", err);
      }
    };

    cargarImagenes();
  }, []);

  const cerrarLightbox = () => setImagenAmpliada(null);

  return (
    <div className="galeria-ig">
      <h2>📸 Clientes reales usando nuestros fardos</h2>

      <div className="galeria-ig__grid">
        {imagenes.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            onClick={() => setImagenAmpliada(img)}
          />
        ))}
      </div>

      {imagenAmpliada && (
        <div className="galeria-ig__lightbox" onClick={cerrarLightbox}>
          <div
            className="galeria-ig__lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imagenAmpliada.src} alt={imagenAmpliada.alt} />
            {imagenAmpliada.link && (
              <a
                href={imagenAmpliada.link}
                target="_blank"
                rel="noopener noreferrer"
                className="galeria-ig__link"
              >
                Ver en Instagram
              </a>
            )}
            <button onClick={cerrarLightbox}>✖</button>
          </div>
        </div>
      )}

      <a
        href="https://www.instagram.com/fashionfardos.cl/"
        target="_blank"
        rel="noopener noreferrer"
        className="galeria-ig__btn"
      >
        Mira más en Instagram
      </a>
    </div>
  );
};

export default GaleriaInstagram;
