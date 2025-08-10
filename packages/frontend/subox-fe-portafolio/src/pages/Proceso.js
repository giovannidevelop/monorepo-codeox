import React from "react";

export default function Proceso() {
  const pasos = [
    { n: 1, t: "Descubrimiento", d: "Entendemos objetivos, contenidos y plazos." },
    { n: 2, t: "Propuesta & Alcance", d: "Alcances cerrados, precio y timeline." },
    { n: 3, t: "Desarrollo & QA", d: "Iteramos con avances visibles y feedback." },
    { n: 4, t: "Despliegue & Capacitación", d: "VPS, Cloudflare, SSL y training grabado." },
    { n: 5, t: "Mantención", d: "Soporte, mejoras y monitoreo." },
  ];

  return (
    <section id="proceso" className="bg-slate-50 py-16 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center">Nuestro proceso</h2>
        <div className="mt-8 grid md:grid-cols-5 gap-5">
          {pasos.map((p) => (
            <div key={p.n} className="p-5 bg-white border rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">{p.n}</div>
              <h3 className="mt-3 font-semibold">{p.t}</h3>
              <p className="text-slate-600 text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
