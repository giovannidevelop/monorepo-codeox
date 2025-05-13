import React, { useState } from "react";
import Proveedores from "../proveedores/Proveedores";
import EstadisticasDashboard from "../estadisticas/EstadisticasDashboard";
import ClienteList from "../../clientes/ClienteList";
import FardoDirectoList from "../fardos/fardosDirectos/FardoDirectoList";

const TabSwitcher = ({ searchTerm }) => {
  const [activeTab, setActiveTab] = useState("MainMenu");

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button className={activeTab === "MainMenu" ? "active" : ""} onClick={() => setActiveTab("MainMenu")}>Fardos</button>
        <button className={activeTab === "EstadisticasDashboard" ? "active" : ""} onClick={() => setActiveTab("EstadisticasDashboard")}>Estadisticas</button>
        <button className={activeTab === "Proveedores" ? "active" : ""} onClick={() => setActiveTab("Proveedores")}>Proveedores</button>
        <button className={activeTab === "ClienteList" ? "active" : ""} onClick={() => setActiveTab("ClienteList")}>Clientes</button>
      </div>

      <div className="tab-content">
        {activeTab === "MainMenu" && <FardoDirectoList searchTerm={searchTerm} />}
        {activeTab === "EstadisticasDashboard" && <EstadisticasDashboard searchTerm={searchTerm} />}
        {activeTab === "ClienteList" && <ClienteList searchTerm={searchTerm} />}
        {activeTab === "Proveedores" && <Proveedores searchTerm={searchTerm} />}
      </div>
    </div>
  );
};


export default TabSwitcher;