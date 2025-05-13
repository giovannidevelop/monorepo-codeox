import React, { useState } from "react";
import FardosDirectoes from "./FardosDirectoes";
import FardosArmados from "./FardosArmados";
import RopaMarca from "../ropaMarca/RopaMarca";
import "./InventoryTabs.css";

const InventoryTabs = () => {
  const [activeTab, setActiveTab] = useState("Directoes");

  const renderTab = () => {
    switch (activeTab) {
      case "Directoes":
        return <FardosDirectoes />;
      case "armados":
        return <FardosArmados />;
      case "marca":
        return <RopaMarca />;
      default:
        return null;
    }
  };

  return (
    <div className="inventory-tabs-container">
      <div className="inventory-tabs">
        <button
          className={activeTab === "Directoes" ? "active" : ""}
          onClick={() => setActiveTab("Directoes")}
        >
          Fardos Directos
        </button>
        <button
          className={activeTab === "armados" ? "active" : ""}
          onClick={() => setActiveTab("armados")}
        >
          Fardos Seleccionados
        </button>
        <button
          className={activeTab === "marca" ? "active" : ""}
          onClick={() => setActiveTab("marca")}
        >
          Ropa de Marca
        </button>
      </div>
      <div className="inventory-tab-content">{renderTab()}</div>
    </div>
  );
};

export default InventoryTabs;