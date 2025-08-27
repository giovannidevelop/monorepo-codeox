import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {endpoints } from "../../../config/api"; // <- usamos la base de products

// helper fetch con manejo de JSON/204
const apiRequest = async (u, options = {}) => {
  const res = await fetch(u, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    const msg = ct.includes("application/json") ? (await res.json()).message : await res.text();
    throw new Error(msg || "Error en la API");
  }
  if (res.status === 204) return null;
  return ct.includes("application/json") ? res.json() : res.text();
};

// fallback local (DEV): /public/data/ventas.json
const getVentasFallback = async () => {
  try {
    const r = await fetch("/data/ventas.json");
    if (!r.ok) throw new Error("No se pudo leer /data/ventas.json");
    return await r.json();
  } catch {
    return [];
  }
};

const EstadisticasDashboard = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const ventasUrl = endpoints.productos.ventas.list();
        const data = await apiRequest(ventasUrl);
        setVentas(Array.isArray(data) ? data : []);
      } catch {
        // si el endpoint aún no existe, usa el archivo local
        const local = await getVentasFallback();
        setVentas(Array.isArray(local) ? local : []);
      }
    };
    load();
  }, []);

  const totalIngresos = ventas.reduce((sum, v) => sum + (Number(v.precioVenta) || 0), 0);
  const totalVendidos = ventas.length;

  const formasPagoData = Object.entries(
    ventas.reduce((acc, v) => {
      const key = v.formaPago || "N/D";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h2>Resumen Estadístico</h2>
      <p><strong>Total Ventas:</strong> {totalVendidos}</p>
      <p><strong>Ingresos Totales:</strong> ${totalIngresos.toLocaleString()}</p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={formasPagoData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {formasPagoData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EstadisticasDashboard;
