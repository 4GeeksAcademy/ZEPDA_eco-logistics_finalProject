import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const NewsSection = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Para gestionar el índice actual de las noticias a mostrar

  useEffect(() => {
    actions.fetchNews(setLoading);
  }, []);

  useEffect(() => {
    // Cambiar de noticias automáticamente cada 5 segundos
    const interval = setInterval(() => {
      nextSlide(); // Llamamos a nextSlide para cambiar el índice
    }, 12000);

    // Limpiar el intervalo al desmontarse el componente
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Función para avanzar al siguiente conjunto de 4 noticias
  const nextSlide = () => {
    if (currentIndex + 4 < store.news.length) {
      setCurrentIndex(currentIndex + 4);
    } else {
      setCurrentIndex(0); // Si llegamos al final, volvemos al principio
    }
  };

  // Función para retroceder al conjunto anterior de 4 noticias
  const prevSlide = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    } else {
      setCurrentIndex(store.news.length - 4); // Si estamos al principio, vamos al final
    }
  };

  // Imagen por defecto si no se carga la original
  const defaultImage = "https://via.placeholder.com/200";

  return (
    <div className="container mt-5 news-section position-relative">
      <h1>Últimas noticias sobre sostenibilidad</h1>
      <div className="carousel-container-nws">
        {loading ? (
          <p>Cargando noticias...</p>
        ) : store.news.length > 0 ? (
          <div className="row">
            {/* Mostrar 4 noticias por vez */}
            {store.news.slice(currentIndex, currentIndex + 4).map((article, index) => (
              <div className="col-md-3 mb-4" key={article.title}>
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
                        src={article.urlToImage || defaultImage} // Usamos la imagen por defecto si no hay imagen
                        className="card-img-top img-fluid"
                        alt={`news-${index}`}
                        style={{
                          objectFit: "cover", // Asegura que la imagen no se deforme
                          height: "200px", // Fija la altura de la imagen
                        }}
                        onError={(e) => { e.target.src = defaultImage; }} // Si la imagen falla, se carga la imagen por defecto
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