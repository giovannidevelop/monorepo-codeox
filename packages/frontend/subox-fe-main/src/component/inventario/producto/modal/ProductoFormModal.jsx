import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./productoFormModal.scss";

const ProductoFormModal = ({ isOpen, onClose, initialData = {}, onSave }) => {
  const initInputRef = useRef(null);

  const [form, setForm] = useState({
    nombre: "",
    codigoBarras: "",
    descripcion: "",
    precioCompra: "",
    precioVenta: "",
    stock: "",
    fechaIngreso: new Date().toISOString().slice(0, 10),
    categoriaId: "",
    marcaId: "",
    calidadId: "",
    estadoProductoId: "",
    imagen: "https://picsum.photos/300?random=1"
  });

  const [errores, setErrores] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [calidades, setCalidades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get("http://localhost:7003/categorias").then(res => setCategorias(res.data));
      axios.get("http://localhost:7003/marcas").then(res => setMarcas(res.data));
      axios.get("http://localhost:7003/calidades").then(res => setCalidades(res.data));
      axios.get("http://localhost:7003/estadoProductos").then(res => setEstados(res.data));

      setForm({
        nombre: "",
        codigoBarras: "",
        descripcion: "",
        precioCompra: "",
        precioVenta: "",
        stock: "",
        fechaIngreso: new Date().toISOString().slice(0, 10),
        categoriaId: "",
        marcaId: "",
        calidadId: "",
        estadoProductoId: "",
        imagen: "https://picsum.photos/300?random=1",
        ...initialData
      });

      setTimeout(() => {
        initInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const cambiarImagen = () => {
    const num = Math.floor(Math.random() * 100);
    setForm(prev => ({ ...prev, imagen: `https://picsum.photos/300?random=${num}` }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre es obligatorio";
    if (!form.precioVenta) newErrors.precioVenta = "Precio de venta es obligatorio";
    if (!form.categoriaId) newErrors.categoriaId = "Seleccione categoría";
    if (!form.marcaId) newErrors.marcaId = "Seleccione marca";
    if (!form.calidadId) newErrors.calidadId = "Seleccione calidad";
    if (!form.estadoProductoId) newErrors.estadoProductoId = "Seleccione estado";
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      precioCompra: parseInt(form.precioCompra),
      precioVenta: parseInt(form.precioVenta),
      stock: parseInt(form.stock),
    };

    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
<div className="producto-modal" onClick={onClose}>
  <div className="producto-modal__content" onClick={(e) => e.stopPropagation()}>
    <h2 className="producto-modal__header">{form.id ? "Editar Producto" : "Nuevo Producto"}</h2>
    <form onSubmit={handleSubmit} className="producto-modal__form">
      <div className="producto-modal__grid">
        <input className="producto-modal__input" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} ref={initInputRef} />
        <input className="producto-modal__input" name="codigoBarras" placeholder="Código de Barras" value={form.codigoBarras} onChange={handleChange} />
        <textarea className="producto-modal__input producto-modal__textarea" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <input className="producto-modal__input" name="precioCompra" type="number" placeholder="Precio Compra" value={form.precioCompra} onChange={handleChange} />
        <input className="producto-modal__input" name="precioVenta" type="number" placeholder="Precio Venta" value={form.precioVenta} onChange={handleChange} />
        <input className="producto-modal__input" name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <input className="producto-modal__input" name="fechaIngreso" type="date" value={form.fechaIngreso} onChange={handleChange} />

        <select className="producto-modal__input" name="categoriaId" value={form.categoriaId} onChange={handleChange}>
          <option value="">Selecciona Categoría</option>
          {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>

        <select className="producto-modal__input" name="marcaId" value={form.marcaId} onChange={handleChange}>
          <option value="">Selecciona Marca</option>
          {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>

        <select className="producto-modal__input" name="calidadId" value={form.calidadId} onChange={handleChange}>
          <option value="">Selecciona Calidad</option>
          {calidades.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>

        <select className="producto-modal__input" name="estadoProductoId" value={form.estadoProductoId} onChange={handleChange}>
          <option value="">Selecciona Estado</option>
          {estados.map(e => <option key={e.id} value={e.id}>{e.estado}</option>)}
        </select>

        <div className="producto-modal__imagen">
          <img src={form.imagen} alt="preview" width={120} />
          <button type="button" onClick={cambiarImagen} className="producto-modal__btn-imagen">Cambiar Imagen Dummy</button>
        </div>
      </div>

      <div className="producto-modal__botones">
        <button type="submit" className="producto-modal__btn producto-modal__btn--guardar">Guardar</button>
        <button type="button" onClick={onClose} className="producto-modal__btn producto-modal__btn--cancelar">Cancelar</button>
      </div>
    </form>
  </div>
</div>


  );
};


export default ProductoFormModal;
