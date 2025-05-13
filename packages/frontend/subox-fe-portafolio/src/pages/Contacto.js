import React from "react";

function Contacto() {
  return (
    <section className="text-center my-10">
      <h2 className="text-2xl font-bold mb-4">Contacto</h2>
      <p className="text-lg mb-4">¿Tienes un proyecto en mente? ¡Hablemos!</p>
      <a href="https://wa.me/56912345678" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Escríbeme por WhatsApp
      </a>
    </section>
  );
}

export default Contacto;
