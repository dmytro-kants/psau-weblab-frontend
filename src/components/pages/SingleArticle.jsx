import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $api from '../../utils/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../assets/styles/article.css';
import { InfinitySpin } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import ScrollToTop from '../common/ScrollToTop';

const SingleArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const location = useLocation();
  const page = location?.state?.page || 1;
  const searchValue = location?.state?.searchValue || ""

  const getSingleArticle = async (id) => {
    try {
      const result = await $api.get(`/getSingleArticle?id=${id}`);
      setArticle(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleArticle(id);
  }, [id]);

  if (!article) {
    return (
      <div className='spiner-container'>
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    );
  }

  const date = new Date(article.data.date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatter = new Intl.DateTimeFormat('uk-UA', options)
  const formattedDate = dateFormatter.format(date);

  return (
    <div className="container">
      <Link
        className="back-to-works-link"
        to={{
          pathname: `/news`,
          state: { page, searchValue }
        }}
      >
        Назад до новин
      </Link>
      <div className="article-info">
        <span>Автор: {article.data.author.email}</span>
        <span>Створено: {formattedDate}</span>
        <span>Переглядів: {article.data.viewCounter}</span>
      </div>
      <h1>{article.data.title}</h1>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.data.content }}
      ></div>
      {isAuth ? (
        <Link
          to={{ pathname: `/news/${id}/edit`, state: { id: article.data._id } }}
          className="edit-button"
        >
          Редагувати новину
        </Link>
      ) : null}

      <ScrollToTop />
    </div>
  );
};

export default SingleArticle;
