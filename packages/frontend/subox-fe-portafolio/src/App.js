import React from "react";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Planes from "./pages/Planes";
import Equipo from "./pages/Equipo";
import Proceso from "./pages/Proceso";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <div className="font-sans text-slate-800">
      {/* Navbar simple */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="text-2xl font-extrabold">Code<span className="text-indigo-600">Ox</span></a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#servicios" className="hover:text-indigo-600">Servicios</a>
            <a href="#planes" className="hover:text-indigo-600">Planes</a>
            <a href="#equipo" className="hover:text-indigo-600">Equipo</a>
            <a href="#proceso" className="hover:text-indigo-600">Proceso</a>
            <a href="#contacto" className="hover:text-indigo-600">Contacto</a>
          </nav>
          <a
            href="https://wa.me/56928839376?text=Hola%20CodeOx,%20quiero%20cotizar"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700"
          >
            💬 Cotizar
          </a>
        </div>
      </header>

      <main>
        <Home />
        <Servicios />
        <Planes />
        <Equipo />
        <Proceso />
        <Contacto />
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CodeOx. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
