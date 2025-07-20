import { useNavigate } from "react-router-dom";
import "./productoModal.scss";

const ProductModal = ({ producto, onClose }) => {
    const navigate = useNavigate();

    const verDetalle = () => {
        navigate(`/producto/${producto.id}`);
        onClose(); // Cierra el modal
    };

    return (
        <div className="product-modal">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precioVenta}</p>
            <button onClick={verDetalle}>Ver más detalles</button>
            <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/producto/${producto.id}`)}>
                Copiar link
            </button>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};

export default ProductModal;
