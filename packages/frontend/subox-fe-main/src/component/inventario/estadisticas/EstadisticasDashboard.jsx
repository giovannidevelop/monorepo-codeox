import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');


const EstadisticasDashboard = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch(BASE_URL+"/ventas")
      .then((res) => res.json())
      .then((data) => setVentas(data));
  }, []);

  const totalIngresos = ventas.reduce((sum, v) => sum + v.precioVenta, 0);
  const totalVendidos = ventas.length;

  const formasPagoData = Object.entries(
    ventas.reduce((acc, v) => {
      acc[v.formaPago] = (acc[v.formaPago] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

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