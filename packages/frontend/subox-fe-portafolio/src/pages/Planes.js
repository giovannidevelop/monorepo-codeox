// src/pages/Planes.js
import React, { useState } from "react";
import { createOrderFlow } from "../lib/payments";

export default function Planes() {
  const [email, setEmail] = useState("");

  const pagar = async (planId, amount) => {
    try {
      if (!email) return alert("Ingresa tu correo para el comprobante.");
      const commerceOrder = `COX-${Date.now()}`;     // id único simple
      const subject = `Plan ${planId}`;              // lo que verá el cliente en Flow

    const { redirectUrl } = await createOrderFlow({
      subject: `Plan ${planId}`,
      amount,
      email,
      commerceOrder: `COX-${Date.now()}`,
      paymentMethod: 9,
    });
    window.location.href = redirectUrl;          // ← al checkout de Flow
    } catch (e) {
      console.error(e);
      alert("No se pudo iniciar el pago: " + e.message);
    }
  };

  return (
    <section id="planes" className="section max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-6">Planes</h1>

      <div className="mb-6 max-w-md">
        <label className="block text-sm mb-1">Correo para el comprobante</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="cliente@correo.cl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="border rounded-2xl p-6 shadow-sm max-w-sm">
        <h2 className="text-xl font-bold">Web Starter</h2>
        <p className="mt-2 text-slate-600">Landing + WhatsApp + IG + FB</p>
        <div className="mt-4 text-2xl font-extrabold">$350</div>
        <button
          onClick={() => pagar("STARTER", 350)}
          className="mt-4 w-full rounded-xl bg-indigo-600 text-white py-2 font-semibold"
        >
          Comprar
        </button>
      </div>
    </section>
  );
}
