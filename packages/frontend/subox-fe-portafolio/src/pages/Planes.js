import React from "react";

export default function Planes() {
  const planes = [
    {
      nombre: "Landing Express",
      descripcion: "1 página pro, SEO básico, WhatsApp/formulario, SSL y deploy.",
      precio: "$149.000 CLP",
      sub: "Pago único",
      featured: false,
      ctaText: "Quiero mi Landing",
    },
    {
      nombre: "Inventario Pyme",
      descripcion: "Productos, stock, ventas, clientes y reportes. Exportación a Excel.",
      precio: "$299.000 CLP",
      sub: "+ $19.000/mes mantención",
      featured: true,
      ctaText: "Implementar Inventario",
    },
    {
      nombre: "E-commerce Start",
      descripcion: "Carrito + pagos (Transbank/Mercado Pago), órdenes y emails.",
      precio: "$349.000 CLP",
      sub: "+ $19.000/mes",
      featured: true,
      ctaText: "Abrir mi tienda",
    },
    {
      nombre: "E-commerce Pro",
      descripcion: "Cupones, recuperación de carrito, catálogos Meta, analítica avanzada.",
      precio: "$699.000 CLP",
      sub: "+ $39.000/mes",
      featured: false,
      ctaText: "Escalar mi tienda",
    },
  ];

  return (
    <section id="planes" className="bg-white border-t border-slate-200 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center">Planes</h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Elige el plan que calza con tu etapa. Todos incluyen configuración de dominio, DNS, SSL y despliegue.
        </p>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`p-5 rounded-2xl border shadow-sm bg-white ${plan.featured ? "border-indigo-600" : "border-slate-200"}`}
            >
              <h3 className="font-bold text-xl">{plan.nombre}</h3>
              <p className="mt-1 text-slate-600">{plan.descripcion}</p>
              <div className="mt-4">
                <div className="text-2xl font-extrabold">{plan.precio}</div>
                <div className="text-sm text-slate-500">{plan.sub}</div>
              </div>
              <a
                href={`https://wa.me/56928839376?text=Hola%20CodeOx,%20me%20interesa:%20${encodeURIComponent(plan.nombre)}`}
                target="_blank"
                rel="noreferrer"
                className={`mt-5 inline-flex w-full justify-center rounded-xl px-4 py-2.5 font-semibold ${
                  plan.featured ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
