// src/App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import ThanksPage from "./pages/ThanksPage";

export default function App() {
  return (
    <div className="font-sans text-slate-800">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold">
            Code<span className="text-indigo-600">Ox</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#servicios">Servicios</a>
            <a href="#planes">Planes</a>
            <a href="#equipo">Equipo</a>
            <a href="#proceso">Proceso</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gracias" element={<ThanksPage />} />
      </Routes>
    </div>
  );
}
