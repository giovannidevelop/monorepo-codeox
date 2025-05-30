import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = ({ categories }) => {
  const settings = {
    dots: true, // Muestra los puntos de navegación
    infinite: false, // Reproducción infinita
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Una imagen a la vez
    slidesToScroll: 1, // Avanza una imagen a la vez
    autoplay: true, // Activar reproducción automática
    autoplaySpeed: 3000, // Velocidad de reproducción automática
    responsive: [
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1, // Una imagen también en pantallas pequeñas
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="carousel__item">
            <img
              src={category.imgSrc}
              alt={category.altText}
              className="carousel__item-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150"; // Imagen de respaldo
              }}
            />
            <h3 className="carousel__item-title">{category.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
