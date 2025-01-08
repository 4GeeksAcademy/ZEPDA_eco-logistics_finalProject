import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const NewsDetail = () => {
  const { store } = useContext(Context);
  const { index } = useParams();
  const article = store.news[index];

  if (!article) {
    return <p>Noticia no encontrada</p>;
  }

  return (
    <div className="container mt-5 news-detail">
      <h2>{article.title}</h2>
      <img src={article.urlToImage} className="d-block w-100" alt={`news-${index}`} />
      <p>{article.content}</p>
    </div>
  );
};