import React from "react";
import CategoryItem from "../CategoryItem"; // ajusta la ruta según tu estructura
import "./CategoriasDestacadas.scss";

const CategoriasDestacadas = ({
  categorias,
  isLoading,
  error,
  onCategoriaClick,
  categoriaActiva
}) => {
  if (isLoading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="categorias">
      <h2>Categorías destacadas </h2>
      <div className="categorias__scroll">
        {categorias.map((cat, index) => (
          <CategoryItem
            key={index}
            title={cat.title}
            imgSrc={cat.imgSrc}
            altText={cat.altText}
            onClick={onCategoriaClick}
            isActive={categoriaActiva === cat.title}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriasDestacadas;
