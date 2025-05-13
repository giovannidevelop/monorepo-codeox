import React from "react";
import ProveedorList from "./ProveedorList";

const Proveedores = ({searchTerm}) => {
  return (
    <section className="inventory-section">
      <ProveedorList searchTerm={searchTerm} />
    </section>
  );
};

export default Proveedores;
