// src/lib/payments.js
const fromProc =
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) || "";
const fromWin =
  (typeof window !== "undefined" && window.__API_BASE__) || "";
const API_BASE = fromProc || fromWin || "";
const API = `${API_BASE}/api`;

export async function createOrderFlow({ subject, amount, email, commerceOrder, paymentMethod = 9 }) {
  const res = await fetch(`${API}/payments/flow/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ subject, amount, email, commerceOrder, paymentMethod }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

  const { paymentUrl, token, flowOrder, commerceOrder: co } = await res.json();
  if (!paymentUrl) throw new Error("La API no retornó paymentUrl");

  return { redirectUrl: paymentUrl, token, flowOrder, commerceOrder: co || commerceOrder };
}
