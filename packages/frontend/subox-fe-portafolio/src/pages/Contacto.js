import React from "react";

export default function Contacto() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl bg-indigo-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold">¿Listo para despegar?</h3>
          <p className="opacity-90 mt-2">Agenda una llamada y vemos el plan ideal para tu negocio.</p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://wa.me/56928839376?text=Hola%20CodeOx,%20quiero%20cotizar"
            className="rounded-xl bg-white text-indigo-700 px-5 py-3 font-semibold shadow hover:bg-slate-100"
          >
            Hablar por WhatsApp
          </a>
          <a
            href="mailto:hola@codeox.cl?subject=Cotizaci%C3%B3n%20CodeOx"
            className="rounded-xl border border-white/60 px-5 py-3 font-semibold hover:bg-indigo-700"
          >
            Escribir por email
          </a>
        </div>
      </div>
    </section>
  );
}
