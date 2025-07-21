import { useNavigate } from "react-router-dom";
import "./productoModal.scss";

const ProductModal = ({ producto, onClose }) => {
    const navigate = useNavigate();

    const verDetalle = () => {
        navigate(`/producto/${producto.id}`);
        onClose();
    };

    const copiarLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/producto/${producto.id}`);
    };

    return (
        <div className="product-modal">
            <div className="product-modal__content">
                <img src={producto.image} alt={producto.name} className="product-modal__image" />

                <div className="product-modal__info">
                    <h2 className="product-modal__title">{producto.name}</h2>
                    <p className="product-modal__description">{producto.description}</p>

                    <ul className="product-modal__details">
                        <li><strong>Categoría:</strong> {producto.categoria}</li>
                        <li><strong>Marca:</strong> {producto.marca}</li>
                        <li><strong>Calidad:</strong> {producto.calidad}</li>
                        <li><strong>Estado:</strong> {producto.estado}</li>
                    </ul>

                    <p className="product-modal__price"><strong>Precio:</strong> ${producto.price}</p>

                    <div className="product-modal__buttons">
                        <button onClick={verDetalle}>Ver más detalles</button>
                        <button onClick={copiarLink}>Copiar link</button>
                        <button onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
