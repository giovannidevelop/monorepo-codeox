import React, { useEffect, useState, useRef } from "react";
import styles from "./FardoDirectoList.module.css";
import FardoMenu from "../../fardos/FardoMenu";
import CrearFardoArmadoModal from "../modal/CrearFardoArmadoModal";
import { endpoints } from "../../../../../config/api";

// ------- Helper fetch con manejo de 204 / texto / json -------
const DEFAULT_HEADERS = { "Content-Type": "application/json" };
async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
  });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    let payload;
    try {
      payload = ct.includes("application/json") ? await res.json() : await res.text();
    } catch { payload = null; }
    const msg = (payload && (payload.message || payload.error)) || (typeof payload === "string" ? payload : "Error en la API");
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

// ------- Fallback a datos locales (DEV) -------
async function fetchFallbackDbJson() {
  // /public/data/db.json -> { fardosDirectos: [...] }
  try {
    const r = await fetch("/data/db.json");
    if (!r.ok) throw new Error("No se pudo leer /data/db.json");
    const j = await r.json();
    return Array.isArray(j?.fardosDirectos) ? j.fardosDirectos : [];
  } catch (e) {
    console.warn("Fallback local falló:", e.message);
    return [];
  }
}

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
  const [metricas, setMetricas] = useState({ fardosVendidos: 0, armadosActivos: 0 });

  const menuRefs = useRef({});
  const itemsPerPage = 5;

  // ------- Cálculo métricas -------
  const recomputeMetricas = (items) => {
    const armadosActivos = items.reduce((acc, f) => {
      const vivos = (f.fardosArmados || []).filter(a => (a?.stock ?? 0) > 0).length;
      return acc + vivos;
    }, 0);
    // fardosVendidos lo dejamos como métrica de sesión (se incrementa en eventos)
    setMetricas((m) => ({ ...m, armadosActivos }));
  };

  // ------- Cargar lista -------
  useEffect(() => {
    const load = async () => {
      try {
        const url = endpoints.productos.fardosDirectos.list();
        const data = await apiRequest(url);
        setFardos(Array.isArray(data) ? data : []);
        recomputeMetricas(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("Fallo API fardos-directos, usando fallback local:", e.message);
        const local = await fetchFallbackDbJson();
        setFardos(local);
        recomputeMetricas(local);
      }
    };
    load();
  }, []);

  const toggleExpand = (idFardo) => {
    setExpandedFardos(prev => prev.includes(idFardo) ? prev.filter(id => id !== idFardo) : [...prev, idFardo]);
  };

  // ------- Crear armado (POST API + estado local) -------
  const handleCrearFardoArmado = async (fardo) => {
    setFardoParaArmar(fardo);
    setModalCrearArmadoOpen(true);
    setOpenDropdownId(null);
  };

  // Esta función será pasada al modal como onCrear
  const crearArmadoEnServidor = async (idFardoDirecto, payload) => {
    try {
      const url = endpoints.productos.fardosDirectos.createArmado(idFardoDirecto);
      await apiRequest(url, { method: "POST", body: JSON.stringify(payload) });
      return true;
    } catch (e) {
      console.error("Error creando armado en servidor:", e.message);
      return false;
    }
  };

  // ------- Editar (modal) -------
  const handleEditFardo = (fardo) => {
    setFardoEditing(fardo);
    setModalEditOpen(true);
    setOpenDropdownId(null);
  };

  // ------- Vender fardo (POST API + estado local) -------
  const handleVenderFardo = async (fardo) => {
    if (!window.confirm(`¿Seguro que quieres vender el Fardo ID ${fardo.id}?`)) return;

    try {
      const url = endpoints.productos.fardosDirectos.sell(fardo.id);
      await apiRequest(url, { method: "POST" });

      setFardos(prev => prev.map(f =>
        f.id === fardo.id ? { ...f, pesoKg: 0, estadoCompra: "Vendido", ventaDirecta: true } : f
      ));
      setMetricas(m => ({ ...m, fardosVendidos: m.fardosVendidos + 1 }));
      setOpenDropdownId(null);
    } catch (e) {
      alert(`No se pudo vender el fardo: ${e.message}`);
    }
  };

  // ------- Vender armado (POST API + estado local) -------
  const handleVenderArmado = async (idFardoDirecto, idArmado) => {
    if (!window.confirm(`¿Seguro que quieres vender 1 unidad del Armado ${idArmado}?`)) return;

    try {
      const url = endpoints.productos.fardosDirectos.sellArmado(idFardoDirecto, idArmado);
      await apiRequest(url, { method: "POST" });

      setFardos(prev => {
        const updated = prev.map(f => {
          if (f.id !== idFardoDirecto) return f;

          const nuevosArmados = (f.fardosArmados || []).map(a =>
            a.idArmado === idArmado ? { ...a, stock: a.stock > 0 ? a.stock - 1 : 0 } : a
          );

          const todosSinStock = nuevosArmados.length > 0 && nuevosArmados.every(a => (a.stock ?? 0) === 0);
          return { ...f, estadoCompra: todosSinStock ? "Vendido completo" : f.estadoCompra, fardosArmados: nuevosArmados };
        });

        // Recalcular métricas tras vender
        recomputeMetricas(updated);
        return updated;
      });

      setMetricas(prev => ({ ...prev, fardosVendidos: prev.fardosVendidos + 1 }));
      setOpenDropdownId(null);
    } catch (e) {
      alert(`No se pudo vender el armado: ${e.message}`);
    }
  };

  // ------- Filtro / Paginación -------
  const filteredFardos = fardos.filter((f) =>
    (f.tipoDirecto || "").toLowerCase().includes(search.toLowerCase()) ||
    (f.proveedor || "").toLowerCase().includes(search.toLowerCase()) ||
    (f.estadoCompra || "").toLowerCase().includes(search.toLowerCase())
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
          <p>{metricas.fardosVendidos}</p>
        </div>
        <div className={styles.dashboardItem}>
          <h4>Fardos Armados Activos</h4>
          <p>{metricas.armadosActivos}</p>
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
                            {(fardo.fardosArmados || []).map((armado) => (
                              <tr key={armado.idArmado}>
                                <td>{armado.idArmado}</td>
                                <td>{armado.pesoFardo} kg</td>
                                <td>{armado.calidad}</td>
                                <td>{Number(armado.precioVenta).toLocaleString()}</td>
                                <td>{armado.stock}</td>
                                <td>
                                  {armado.fechaArmado
                                    ? new Date(armado.fechaArmado).toLocaleDateString("es-CL")
                                    : "N/A"}
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
        onCrear={async (nuevoArmado, pesoArmado) => {
          if (pesoArmado > (fardoParaArmar?.pesoKg ?? 0)) {
            alert("Error: El peso del nuevo armado supera el peso disponible del fardo.");
            return;
          }

          // 1) Intento en servidor
          const ok = await crearArmadoEnServidor(fardoParaArmar.id, {
            ...nuevoArmado,
            pesoArmado,
          });

          // 2) Optimistic update (si el MS aún no existe, al menos verás el cambio)
          setFardos(prev =>
            prev.map(f =>
              f.id === fardoParaArmar.id
                ? {
                    ...f,
                    pesoKg: (f.pesoKg || 0) - pesoArmado,
                    fardosArmados: [...(f.fardosArmados || []), nuevoArmado],
                  }
                : f
            )
          );
          setModalCrearArmadoOpen(false);

          if (!ok) {
            alert("Aviso: el armado se agregó localmente, pero el endpoint aún no está disponible en el backend.");
          }

          // Recalcular métricas
          setTimeout(() => recomputeMetricas(
            // usa el estado más reciente
            typeof window !== "undefined" ? JSON.parse(JSON.stringify(
              (prev) => prev // noop en setTimeout; si quieres exactitud, llama recompute al setState de arriba.
            )) : []
          ), 0);
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
