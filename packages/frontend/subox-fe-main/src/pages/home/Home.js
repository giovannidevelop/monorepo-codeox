import React, { useState, useEffect } from "react";
import "./home.scss";
import CategoryItem from "../../component/dashboard/categoria/CategoryItem";
import Jumbotrom from "../../component/dashboard/jumbotrom/Jumbotrom";
import ProductoDestacado from "../../component/dashboard/productoDestacado/ProductoDestacado";
import { useDispatch } from "react-redux";
import { agregarProducto } from "./../../app/redux/reducers/carritoReducer";
import Testimonio from "../../component/dashboard/testimonio/Testimonio";
import GaleriaInstagram from "../../component/dashboard/galeriaInstagram/GaleriaInstagram";
import CarruselTestimonios from "../../component/dashboard/testimonio/CarruselTestimonios";
import Servicios from "../../component/dashboard/servicios/Servicios";
import TrabajaConNosotros from "../../component/dashboard/trabajaConNosotros/TrabajaConNosotros";
import Footer from "../../component/dashboard/footer/Footer";
import CategoriasDestacadas from "../../component/dashboard/categoria/categoriasDestacadas/CategoriasDestacadas";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [jumbotronImages, setJumbotronImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => p.categoria === categoriaSeleccionada)
    : productos;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productosRes, jumbotronRes, categoriasRes] = await Promise.all([
          fetch("/data/productos.json"),
          fetch("/data/jumbotron.json"),
          fetch("/data/categorias.json"),
        ]);

        const productosData = await productosRes.json();
        const jumbotronData = await jumbotronRes.json();
        const categoriasData = await categoriasRes.json();

        setProductos(productosData);
        setJumbotronImages(jumbotronData);
        setCategories(categoriasData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError("Error al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAgregarAlCarrito = (producto) => {
    dispatch(agregarProducto(producto));
  };

  return (
    <div className="home">
      <Jumbotrom images={jumbotronImages} />
      <CategoriasDestacadas
        categorias={categories}
        isLoading={isLoading}
        error={error}
        onCategoriaClick={(categoria) => setCategoriaSeleccionada(categoria)}
        categoriaActiva={categoriaSeleccionada}
      />
      <div className="home__destacados">
        <h2>Productos {categoriaSeleccionada ? `de ${categoriaSeleccionada}` : "destacados"}</h2>
        {categoriaSeleccionada && (
          <button onClick={() => setCategoriaSeleccionada(null)} className="btn-reset">
            Ver todos
          </button>
        )}
        <div className="home__destacados-grid">
          {productosFiltrados.map((p) => (
            <ProductoDestacado
              key={p.id}
              {...p}
              onAgregar={handleAgregarAlCarrito}
            />
          ))}
        </div>
      </div>
      <CarruselTestimonios />
      <GaleriaInstagram />
      <Servicios />
      <Testimonio/>
      <CategoryItem/>
      <TrabajaConNosotros />
      <Footer />
    </div>
  );
};

export default Home;
