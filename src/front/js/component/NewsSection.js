import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const NewsSection = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    actions.fetchNews(setLoading);
  }, []);

  return (
    <div className="container mt-5 news-section text-success">
      <h4>ÚLTiMAS NOTICIAS SOBRE SOSTENIBILIDAD</h4>
      <div className="carousel-container-nws">
        {loading ? (
          <p>Cargando noticias...</p>
        ) : store.news.length > 0 ? (
          <div id="newsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner-nws">
              {store.news.map((article, index) => (
                <div
                  className={`carousel-item-nws ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <div className="news-item m-2">
                    <Link to={`/news/${index}`}>
                      <img src={article.urlToImage} className="d-block w-100" alt={`news-${index}`} />
                      <div className="carousel-caption d-none d-md-block">
                        <p>{article.title}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <p>No se encontraron noticias.</p>
        )}
      </div>
    </div>
  );
};