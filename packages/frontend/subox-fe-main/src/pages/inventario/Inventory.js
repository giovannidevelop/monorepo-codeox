import React, { useState } from "react";
import "./Inventory.css";
import TabSwitcher from "../../component/inventario/tabs/TabSwitcher";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="inventory-container">
      <TabSwitcher searchTerm={searchTerm} />
    </div>
  );
};

export default Inventory;
