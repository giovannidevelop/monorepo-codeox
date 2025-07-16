import React from "react";
import { useAuth } from "../../provider/AuthProvider";

const GlobalMessage = () => {
  const { authMessage } = useAuth();

  if (!authMessage) return null;

  const color =
    authMessage.type === "error"   ? "bg-red-500" :
    authMessage.type === "success" ? "bg-green-500" :
    authMessage.type === "warning" ? "bg-yellow-500" : "bg-blue-500";

  return (
    <div className={`fixed top-4 right-4 ${color} bg-opacity-90 text-white p-3 rounded shadow-lg z-50`}>
      {authMessage.text}
    </div>
  );
};

export default GlobalMessage;
