import { useEffect, useState } from "react";
import axios from "axios";

const AgregarProducto = ({ onSuccess }) => {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precioVenta: "",
        categoria: "",
        marca: "",
        calidad: "",
        estadoProducto: "",
        imagen: "https://picsum.photos/300?random=1" // dummy por defecto
    });

    const [marcas, setMarcas] = useState([]);
    const [calidades, setCalidades] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7003/marcas").then(res => setMarcas(res.data));
        axios.get("http://localhost:7003/calidades").then(res => setCalidades(res.data));
        axios.get("http://localhost:7003/estadoProductos").then(res => setEstados(res.data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:7003/productos", form)
            .then(() => {
                alert("Producto agregado correctamente");
                onSuccess?.();
            })
            .catch(err => {
                console.error("Error al agregar producto", err);
                alert("Error al guardar producto");
            });
    };

    const cambiarImagen = () => {
        const num = Math.floor(Math.random() * 100);
        setForm({ ...form, imagen: `https://picsum.photos/300?random=${num}` });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
            <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
            <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
            <input name="precioVenta" type="number" placeholder="Precio" onChange={handleChange} required />

            <select name="marca" onChange={handleChange} required>
                <option value="">Selecciona una marca</option>
                {marcas.map(m => (
                    <option key={m.id} value={m.nombre}>{m.nombre}</option>
                ))}
            </select>

            <select name="calidad" onChange={handleChange} required>
                <option value="">Selecciona una calidad</option>
                {calidades.map(c => (
                    <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
            </select>

            <select name="estadoProducto" onChange={handleChange} required>
                <option value="">Selecciona un estado</option>
                {estados.map(e => (
                    <option key={e.id} value={e.estado}>{e.estado}</option>
                ))}
            </select>

            <img src={form.imagen} alt="preview" width={150} />
            <button type="button" onClick={cambiarImagen}>Cambiar imagen dummy</button>

            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default AgregarProducto;
