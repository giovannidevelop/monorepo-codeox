"use client";
import { useState } from "react";
import { createPayment } from "../lib/paymentsClient"; // ajusta la ruta si usas alias

export default function PayButton({ orderId, amount, email }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const returnUrl = `${window.location.origin}/checkout/thanks?orderId=${encodeURIComponent(orderId)}`;

      const { paymentId, redirectUrl } = await createPayment({
        orderId,
        amount,                 // CLP enteros
        customerEmail: email,   // usa un correo real
        returnUrl,
      });

      sessionStorage.setItem("lastPaymentId", String(paymentId));
      window.location.href = redirectUrl; // redirige a Flow
    } catch (e) {
      alert(e?.message || "No se pudo iniciar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="px-4 py-2 rounded-lg border"
    >
      {loading ? "Redirigiendo…" : "Pagar con Flow"}
    </button>
  );
}
