import React, { useEffect, useState, useRef } from "react";
import styles from "./FardoDirectoList.module.css";
import FardoMenu from "../../fardos/FardoMenu";
import CrearFardoArmadoModal from "../modal/CrearFardoArmadoModal";
const BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

const FardoDirectoList = () => {
  const [fardos, setFardos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [modalCrearArmadoOpen, setModalCrearArmadoOpen] = useState(false);
  const [fardoParaArmar, setFardoParaArmar] = useState(null);
  const [fardoEditing, setFardoEditing] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [expandedFardos, setExpandedFardos] = useState([]);
  const [metricas, setMetricas] = useState({
    fardosVendidos: 0,
    armadosActivos: 0
  });
  
  const menuRefs = useRef({});
  const itemsPerPage = 5;

  useEffect(() => {
    fetch(BASE_URL+"/fardosDirectos")

      .then((res) => res.json())
      .then((data) => setFardos(data))
      .catch((err) => console.error("Error cargando fardos directos:", err));
  }, []);

  const toggleExpand = (idFardo) => {
    setExpandedFardos(prev =>
      prev.includes(idFardo)
        ? prev.filter(id => id !== idFardo)
        : [...prev, idFardo]
    );
  };

  const handleCrearFardoArmado = (fardo) => {
    setFardoParaArmar(fardo);
    setModalCrearArmadoOpen(true);
    setOpenDropdownId(null);
  };

  const handleEditFardo = (fardo) => {
    setFardoEditing(fardo);
    setModalEditOpen(true);
    setOpenDropdownId(null);
  };

  const handleVenderFardo = (fardo) => {
    if (window.confirm(`¿Seguro que quieres vender el Fardo ID ${fardo.id}?`)) {
      setFardos(prev =>
        prev.map(f =>
          f.id === fardo.id
            ? {
              ...f,
              pesoKg: 0,
              estadoCompra: "Vendido",
              ventaDirecta: true
            }
            : f
        )
      );
      setOpenDropdownId(null);
    }
  };

  const handleVenderArmado = (idFardoDirecto, idArmado) => {
    if (window.confirm(`¿Seguro que quieres vender 1 unidad del Armado ${idArmado}?`)) {
      setFardos(prev =>
        prev.map(f => {
          if (f.id === idFardoDirecto) {
            const nuevosArmados = f.fardosArmados.map(a =>
              a.idArmado === idArmado
                ? { ...a, stock: a.stock > 0 ? a.stock - 1 : 0 }
                : a
            );
  
            // Revisamos si TODOS los armados ya no tienen stock
            const todosSinStock = nuevosArmados.every(a => a.stock === 0);
  
            return {
              ...f,
              estadoCompra: todosSinStock ? "Vendido completo" : f.estadoCompra,
              fardosArmados: nuevosArmados
            };
          }
          return f;
        })
      );
  
      // 🔥 También actualizar las métricas
      setMetricas(prev => ({
        ...prev,
        fardosVendidos: prev.fardosVendidos + 1,
        armadosActivos: prev.armadosActivos - 1
      }));
  
      setOpenDropdownId(null); // cerrar menú
    }
  };
  
  

  const filteredFardos = fardos.filter((f) =>
    f.tipoDirecto.toLowerCase().includes(search.toLowerCase()) ||
    f.proveedor.toLowerCase().includes(search.toLowerCase()) ||
    f.estadoCompra.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFardos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFardos.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.dashboardItem}>
          <h4>Fardos Directos</h4>
          <p>{fardos.length}</p>
        </div>
        <div className={styles.dashboardItem}>
          <h4>Total Kilos Disponibles</h4>
          <p>{fardos.reduce((acc, f) => acc + (f.pesoKg || 0), 0)} kg</p>
        </div>
    
  
        <div className={styles.dashboardItem}>
  <h4>Fardos Vendidos</h4>
  <p>{metricas.fardosVendidos}</p> {/* 👈 AHORA USA metricas */}
</div>

<div className={styles.dashboardItem}>
  <h4>Fardos Armados Activos</h4>
  <p>{metricas.armadosActivos}</p> {/* 👈 AHORA USA metricas */}
</div>

      </div>

      <input
        type="text"
        placeholder="Buscar por tipo, proveedor o estado..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
      />

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Peso Inicial</th>
              <th>Peso Disponible</th>
              <th>Estado</th>
              <th>Expandir</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((fardo) => (
              <React.Fragment key={fardo.id}>
                <tr>
                  <td>{fardo.id}</td>
                  <td>{fardo.tipoDirecto}</td>
                  <td>{fardo.pesoKgInicial} kg</td>
                  <td>{fardo.pesoKg} kg</td>
                  <td>{fardo.estadoCompra}</td>
                  <td>
                    {(fardo.fardosArmados && fardo.fardosArmados.length > 0) && (
                      <button
                        onClick={() => toggleExpand(fardo.id)}
                        className={expandedFardos.includes(fardo.id) ? styles.expandButtonActive : styles.expandButton}
                      >
                        {expandedFardos.includes(fardo.id) ? "➖ Ocultar" : "➕ Expandir"}
                      </button>
                    )}
                  </td>
                  <td style={{ position: "relative" }}>
                    <button
                      ref={(el) => (menuRefs.current[fardo.id] = el)}
                      onClick={() => setOpenDropdownId(openDropdownId === fardo.id ? null : fardo.id)}
                      className={styles.dropdownButton}
                    >
                      ⋯
                    </button>
                    <FardoMenu
                      isOpen={openDropdownId === fardo.id}
                      onClose={() => setOpenDropdownId(null)}
                      onEdit={() => handleEditFardo(fardo)}
                      onCrearArmado={() => handleCrearFardoArmado(fardo)}
                      onVender={() => handleVenderFardo(fardo)}
                      triggerRef={{ current: menuRefs.current[fardo.id] }}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="7">
                    <div className={expandedFardos.includes(fardo.id) ? styles.armadosContainer : styles.armadosContainerCollapsed}>
                      {expandedFardos.includes(fardo.id) && (
                        <table className={styles.subTable}>
                          <thead>
                            <tr>
                              <th>ID Armado</th>
                              <th>Peso</th>
                              <th>Calidad</th>
                              <th>Precio Venta</th>
                              <th>Stock</th>
                              <th>Fecha Armado</th>
                              <th>Acciones</th>
                            </tr>

                          </thead>
                          <tbody>
                            {fardo.fardosArmados.map((armado) => (
                              <tr key={armado.idArmado}>
                                <td>{armado.idArmado}</td>
                                <td>{armado.pesoFardo} kg</td>
                                <td>{armado.calidad}</td>
                                <td>{armado.precioVenta.toLocaleString()}</td>
                                <td>{armado.stock}</td>
                                <td>
                                  {armado.fechaArmado
                                    ? new Date(armado.fechaArmado).toLocaleDateString("es-CL")
                                    : "N/A"
                                  }
                                </td>
                                <td>
                                  {armado.stock > 0 ? (
                                    <button
                                      onClick={() => handleVenderArmado(fardo.id, armado.idArmado)}
                                      className={styles.sellButton}
                                    >
                                      💵 Vender
                                    </button>
                                  ) : (
                                    <span className={styles.sinStockText}>Sin stock</span>
                                  )}

                                </td>
                              </tr>
                            ))}


                          </tbody>
                        </table>
                      )}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <CrearFardoArmadoModal
        isOpen={modalCrearArmadoOpen}
        onClose={() => setModalCrearArmadoOpen(false)}
        fardoDirecto={fardoParaArmar}
        onCrear={(nuevoArmado, pesoArmado) => {
          if (pesoArmado > fardoParaArmar.pesoKg) {
            alert("Error: El peso del nuevo armado supera el peso disponible del fardo.");
            return;
          }

          setFardos(prev =>
            prev.map(f =>
              f.id === fardoParaArmar.id
                ? {
                  ...f,
                  pesoKg: f.pesoKg - pesoArmado,
                  fardosArmados: [...(f.fardosArmados || []), nuevoArmado]
                }
                : f
            )
          );
        }}

      />

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : styles.page}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FardoDirectoList;
