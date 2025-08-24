// src/pages/ThanksPage.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Detecta base de API: window.__API_BASE__ (dev) o env/proxy
const API_BASE =
  (typeof window !== "undefined" && window.__API_BASE__) ||
  ((typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) || "");

const STATUS_UI = {
  PAID:     { title: "✅ ¡Pago recibido!" },
  PENDING:  { title: "⏳ Pago pendiente" },
  REJECTED: { title: "❌ Pago rechazado" },
  CANCELED: { title: "⚠️ Orden anulada" },
  UNKNOWN:  { title: "❔ Estado desconocido" },
};

export default function ThanksPage() {
  const [search] = useSearchParams();
  const token = search.get("token");
  const order = search.get("order"); // por si tu /return agrega &order=...

  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (!token && !order) return;
        const url = token
          ? `${API_BASE}/api/payments/flow/status-by-token?token=${encodeURIComponent(token)}`
          : `${API_BASE}/api/payments/flow/status/${encodeURIComponent(order)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setErr(e.message || "Error consultando estado");
      }
    })();
  }, [token, order]);

  if (!token && !order)
    return <main className="max-w-xl mx-auto py-16 text-center">Falta <b>token</b> u <b>order</b> en la URL.</main>;
  if (!data && !err)
    return <main className="max-w-xl mx-auto py-16 text-center">Cargando…</main>;
  if (err)
    return <main className="max-w-xl mx-auto py-16 text-center">⚠️ {err}</main>;

  // Tu backend devuelve { commerceOrder, status: "PAID|PENDING|..." , flowOrder }
  const s = (data.status || "UNKNOWN").toUpperCase();
  const view = STATUS_UI[s] || STATUS_UI.UNKNOWN;

  return (
    <main className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-2xl font-bold mb-2">{view.title}</h1>
      {token && <p className="text-slate-600">Token: {token}</p>}
      {data.commerceOrder && <p className="text-slate-600">Orden: {data.commerceOrder}</p>}
      {data.flowOrder && <p className="text-slate-600">FlowOrder: {data.flowOrder}</p>}

      <pre className="text-left text-xs mt-6 bg-gray-100 p-3 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>

      <a href="/" className="inline-block mt-6 underline">Volver al inicio</a>
    </main>
  );
}
