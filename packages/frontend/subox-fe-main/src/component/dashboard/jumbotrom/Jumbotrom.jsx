import React, { useEffect, useState } from "react";
import "./jumbotrom.scss";

const Jumbotrom = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="jumbotrom">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`jumbotrom__slide ${index === currentIndex ? "active" : ""
                        }`}
                    style={{ backgroundImage: `url(${img.imgSrc})` }}
                >
                    <div className="jumbotrom__overlay">
                        <h1 className="jumbotrom__title">Fardos de ropa americana</h1>
                        <p className="jumbotrom__subtitle">Desde $29.990 – Stock disponible</p>

                     <a
  href="https://wa.me/123456789"
  target="_blank"
  rel="noopener noreferrer"
  className="jumbotrom__cta"
>
  Escríbenos por WhatsApp
</a>




                    </div>
                </div>
            ))}
        </div>
    );
};

export default Jumbotrom;
