import React from "react";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <div className="p-4 font-sans">
      <Home />
      <Servicios />
      <Contacto />
    </div>
  );
}

export default App;
