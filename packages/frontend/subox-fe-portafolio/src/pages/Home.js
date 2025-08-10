import React from "react";

export default function Home() {
  return (
    <section id="home" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Soluciones Web & E-commerce para <span className="text-indigo-600">vender</span> más
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            En <strong>CodeOx</strong> construimos sitios estáticos de alto rendimiento, apps de inventario
            y tiendas online con carrito, pagos y despliegue seguro (Nginx + Cloudflare).
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1">SSL/HTTPS</span>
            <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1">CDN & Performance</span>
            <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1">React · Java/Spring</span>
          </div>
          <div className="mt-8 flex gap-3">
            <a href="#planes" className="rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold shadow hover:bg-indigo-700">Ver planes</a>
            <a
              href="https://wa.me/56928839376?text=Hola%20CodeOx,%20necesito%20asesor%C3%ADa"
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:border-slate-400"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 shadow-xl p-6 bg-white">
          <p className="text-sm text-slate-500">Qué hacemos</p>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li>• Landing rápidas que convierten</li>
            <li>• App de inventario para pymes</li>
            <li>• Tiendas con carrito y pasarela de pago</li>
            <li>• Despliegue y seguridad end-to-end</li>
          </ul>
          <p className="mt-6 text-xs text-slate-500">Listo para producción en días, no semanas.</p>
        </div>
      </div>
    </section>
  );
}
