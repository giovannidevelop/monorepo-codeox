import React from "react";

export default function Equipo() {
  const team = [
    { nombre: "Tech Lead", rol: "Arquitectura & Backend (Java/Spring)", iniciales: "TL" },
    { nombre: "Frontend Lead", rol: "UI/UX & Frontend (React/Next)", iniciales: "FL" },
    { nombre: "DevOps", rol: "Nginx, Cloudflare, CI/CD, VPS", iniciales: "DO" },
    { nombre: "Éxito del Cliente", rol: "Onboarding, soporte y training", iniciales: "CS" },
  ];

  return (
    <section id="equipo" className="my-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center">Nuestro equipo</h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Un equipo compacto y senior, orientado a entregar rápido y con calidad de producción.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((p) => (
            <div key={p.nombre} className="p-5 border rounded-2xl bg-white shadow-sm">
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                {p.iniciales}
              </div>
              <h3 className="mt-3 font-semibold">{p.nombre}</h3>
              <p className="text-slate-600 text-sm">{p.rol}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
