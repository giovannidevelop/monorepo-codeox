import { useState } from "react";
import EstadisticasDashboard from "../estadisticas/EstadisticasDashboard";
import ClienteList from "../clientes/ClienteList";
import FardoDirectoList from "../custom/fardos/fardosDirectos/FardoDirectoList";
import ProviderTable from "../../inventario/provider/ProviderTable";
import ProductoList from "../../inventario/producto/ProductoList";

const TabSwitcher = ({ searchTerm }) => {
  const [activeTab, setActiveTab] = useState("MainMenu");

  const handleSelectChange = (e) => {
    setActiveTab(e.target.value);
  };

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <div>      <select
          value={activeTab}
          onChange={(e) => handleSelectChange(e)}
          className={`inventory-tab-select ${activeTab === "MainMenu" ? "active" : ""}`}
        >
          <option value="MainMenu">Fardos</option>
          <option value="TallerMecanico">Taller Mecánico</option>
          <option value="ReservaHoras">Reserva de Horas</option>
          <option value="ReservaMesas">Reserva de Mesas</option>
        </select></div>

        <button className={activeTab === "EstadisticasDashboard" ? "active" : ""} onClick={() => setActiveTab("EstadisticasDashboard")}>Estadísticas</button>
        <button className={activeTab === "Proveedores" ? "active" : ""} onClick={() => setActiveTab("Proveedores")}>Proveedores</button>
        <button className={activeTab === "ClienteList" ? "active" : ""} onClick={() => setActiveTab("ClienteList")}>Clientes</button>
        <button className={activeTab === "ProductoList" ? "active" : ""} onClick={() => setActiveTab("ProductoList")}>Productos</button>
      </div>


      <div className="tab-content">
        {activeTab === "MainMenu" && <FardoDirectoList searchTerm={searchTerm} />}
        {activeTab === "EstadisticasDashboard" && <EstadisticasDashboard searchTerm={searchTerm} />}
        {activeTab === "ClienteList" && <ClienteList searchTerm={searchTerm} />}
        {activeTab === "Proveedores" && <ProviderTable searchTerm={searchTerm} />}
        {activeTab === "ProductoList" && <ProductoList searchTerm={searchTerm} />}

        {/* Opciones dummy por ahora */}
        {activeTab === "TallerMecanico" && <div>Sección Taller Mecánico (pendiente)</div>}
        {activeTab === "ReservaHoras" && <div>Sección Reserva de Horas (pendiente)</div>}
        {activeTab === "ReservaMesas" && <div>Sección Reserva de Mesas (pendiente)</div>}
      </div>
    </div>
  );
};

export default TabSwitcher;
