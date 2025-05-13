import React, { useState, useEffect } from "react";
import "./EditModal.css";

const EditModal = ({ isOpen, onClose, product, onSave, isNew }) => {
  // Estado inicial con valores predeterminados para un producto nuevo
  const initialState = {
    name: "",
    category: "",
    quantity: 0,
    price: 0,
  };

  const [editedProduct, setEditedProduct] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Actualizar estado inicial si cambia el producto o es nuevo
  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    } else if (isNew) {
      setEditedProduct(initialState);
    }
  }, [product, isNew]);

  // Validar campos del formulario
  const validate = () => {
    const newErrors = {};
    if (!editedProduct.name || editedProduct.name.trim() === "")
      newErrors.name = "El nombre es obligatorio.";
    if (!editedProduct.category || editedProduct.category.trim() === "")
      newErrors.category = "La categoría es obligatoria.";
    if (editedProduct.quantity < 0)
      newErrors.quantity = "La cantidad no puede ser negativa.";
    if (editedProduct.price < 0)
      newErrors.price = "El precio no puede ser negativo.";
    return newErrors;
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  // Guardar cambios y cerrar modal si no hay errores
  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave(editedProduct);
      onClose();
    }
  };

  // No renderizar nada si el modal no está abierto
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">
          {isNew ? "Crear Nuevo Producto" : "Editar Producto"}
        </h2>
        <form className="modal-form">
          <div className="modal-form-group">
            <label className="modal-label">Nombre</label>
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.name && <p className="modal-error">{errors.name}</p>}
          </div>
          <div className="modal-form-group">
            <label className="modal-label">Categoría</label>
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.category && (
              <p className="modal-error">{errors.category}</p>
            )}
          </div>
          <div className="modal-form-group">
            <label className="modal-label">Cantidad</label>
            <input
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.quantity && (
              <p className="modal-error">{errors.quantity}</p>
            )}
          </div>
          <div className="modal-form-group">
            <label className="modal-label">Precio</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              className="modal-input"
            />
            {errors.price && <p className="modal-error">{errors.price}</p>}
          </div>
        </form>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-btn cancel">
            Cancelar
          </button>
          <button onClick={handleSave} className="modal-btn save">
            {isNew ? "Crear" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
