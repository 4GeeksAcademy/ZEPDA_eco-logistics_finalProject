import React, { useEffect } from "react";
import { importAllImages } from "../../utils/importAllImages";

// Cargar todas las imágenes
const images = importAllImages(require.context("../../img/zepda-web-img", false, /\.(png|jpe?g|svg|webp)$/));

export const JumbotronCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector('#carouselExampleFade');
    if (carousel) {
      const bootstrapCarousel = new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: 'carousel'
      });
      return () => {
        bootstrapCarousel.dispose();
      };
    }
  }, []);
  return (
    <div className="container jumbotron-carousel">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"  
      >
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
};

