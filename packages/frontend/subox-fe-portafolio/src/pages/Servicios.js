import React from "react";

export default function Servicios() {
  const items = [
    {
      title: "Páginas estáticas (Landing Express)",
      desc: "Sitios rápidos, SEO básico, formularios y WhatsApp. Ideal para captar clientes.",
      icon: "⚡",
    },
    {
      title: "Inventario Pyme (WebApp)",
      desc: "Productos, stock, ventas, clientes y reportes. Exportación a Excel/CSV.",
      icon: "📦",
    },
    {
      title: "Catálogo + Botón Comprar",
      desc: "Muestra productos y recibe pedidos por WhatsApp sin fricción. Upgrade a tienda cuando quieras.",
      icon: "🛒",
    },
    {
      title: "E-commerce Start/Pro",
      desc: "Carrito, pagos (Transbank/Mercado Pago), órdenes y emails. Escalable y seguro.",
      icon: "💳",
    },
    {
      title: "DevOps & Nube",
      desc: "Nginx, VPS, Cloudflare, SSL y CI/CD. Automatizamos tu despliegue.",
      icon: "☁️",
    },
    {
      title: "Soporte & Optimización",
      desc: "Mantenimiento, performance, auditoría técnica y mejoras continuas.",
      icon: "🛠️",
    },
  ];

  return (
    <section id="servicios" className="my-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center">Servicios</h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Equipo CodeOx: ingeniería + diseño para mover la aguja de tu negocio.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {items.map((s) => (
            <div key={s.title} className="p-5 border rounded-2xl shadow-sm bg-white">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="font-semibold text-lg mt-2">{s.title}</h3>
              <p className="text-slate-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
