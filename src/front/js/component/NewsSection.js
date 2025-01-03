import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const NewsSection = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    actions.fetchNews(setLoading);
  }, []);

  return (
    <div className="container mt-5 news-section">
      <h2>Últimas noticias sobre sostenibilidad</h2>
      <div className="carouselnws-container">
        {loading ? (
          <p>Cargando noticias...</p>
        ) : store.news.length > 0 ? (
          <div id="newsCarouselnws" className="carouselnws slide" data-bs-ride="carouselnws">
            <div className="carouselnws-inner">
              {store.news.map((article, index) => (
                <div
                  className={`carouselnws-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img src={article.urlToImage} className="d-block w-100" alt={`news-${index}`} />
                  <div className="carouselnws-caption d-none d-md-block">
                    <h5>{article.title}</h5>
                    <p>{article.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No se encontraron noticias.</p>
        )}
      </div>
    </div>
  );
};