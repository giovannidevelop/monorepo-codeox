import React from "react";

function Servicios() {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Servicios</h2>
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div className="p-4 border rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Desarrollo Web</h3>
          <p>Aplicaciones modernas con React, Next.js, y backend en Java o Node.js.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Despliegue en la Nube</h3>
          <p>Uso de AWS (S3, Beanstalk) o GCP para alojar y escalar tus aplicaciones.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Automatización y APIs</h3>
          <p>Automatizo procesos con microservicios, manejo de bases de datos y APIs REST.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-semibold text-xl mb-2">Soporte y Optimización</h3>
          <p>Mantenimiento, mejoras y optimización de sistemas existentes.</p>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
