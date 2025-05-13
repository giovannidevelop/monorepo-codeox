import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name:  "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = null;
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditing(!editing);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Validaciones
    if (editing && formData.password && formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:7000/api/users/update-profile",
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Perfil actualizado con éxito.");
        setEditing(false);
      } else {
        setError("No se pudo actualizar el perfil. Intenta nuevamente.");
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      if (err.response?.status === 401) {
        setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
      } else {
        setError(err.response?.data?.message || "Error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Perfil de Usuario</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        {editing && (
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Nueva contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          {editing ? (
            <>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                type="button"
                onClick={handleEdit}
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
