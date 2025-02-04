import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const NewsSection = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    actions.fetchNews(setLoading);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + 4;
      return newIndex < store.news.length ? newIndex : 0;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex - 4;
      return newIndex >= 0 ? newIndex : store.news.length - 4;
    });
  };

  const defaultimgs = 'https://example.com/path/to/default-image.jpg';
  // Manejador de error para la imagen
  const handleImageError = (e) => {
    // Usamos una URL de imagen predeterminada en caso de error
    e.target.src = defaultimgs;
    e.target.alt = "Imagen no disponible"; // Texto alternativo
  };

  return (
    <div className="container mt-5 news-section position-relative">
      <h1>Últimas noticias sobre sostenibilidad</h1>
      <div className="carousel-container-nws">
        {loading ? (
          <p>Cargando noticias...</p>
        ) : store.news.length > 0 ? (
          <div className="row">
            {/* Mostrar 4 noticias por vez */}
            {store.news.slice(currentIndex, Math.min(currentIndex + 4, store.news.length)).map((article, index) => (
              <div className="col-md-3 mb-4" key={`article.title-${index}`}>
                <div className="card h-100">
                  {/* Link a la fuente completa del artículo */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={article.urlToImage || defaultimgs}
                        className="card-img-top img-fluid"
                        alt={`news-${index}`}
                        onError={handleImageError} // Aquí llamamos a la función que maneja el error
                        style={{
                          objectFit: "cover",
                          height: "200px",
                        }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title" style={{ fontSize: "1rem", height: "60px", overflow: "hidden" }}>
                        {article.title}
                      </h5>
                      <p className="card-text" style={{ fontSize: "0.875rem", flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {article.description}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron noticias.</p>
        )}
      </div>

      {/* Controles para el slider dentro del contenedor */}
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <button
          className="btn btn-nav"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={30} />
        </button>
      </div>

      <div className="position-absolute top-50 end-0 translate-middle-y">
        <button
          className="btn btn-nav"
          onClick={nextSlide}
          disabled={currentIndex + 4 >= store.news.length}
        >
          <FaArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};
