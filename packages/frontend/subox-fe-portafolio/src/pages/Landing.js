// src/pages/Landing.js
import React from "react";
import Home from "./Home";
import Servicios from "./Servicios";
import Planes from "./Planes";
import Equipo from "./Equipo";
import Proceso from "./Proceso";
import Contacto from "./Contacto";

export default function Landing() {
  return (
    <>
      <section id="home" className="section"><Home /></section>
      <section id="servicios" className="section"><Servicios /></section>
      <section id="planes" className="section"><Planes /></section>
      <section id="equipo" className="section"><Equipo /></section>
      <section id="proceso" className="section"><Proceso /></section>
      <section id="contacto" className="section"><Contacto /></section>
    </>
  );
}
