import React, { useEffect, useState } from 'react';
import '../../assets/styles/pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleAsync, getAllArticlesAsync } from '../../utils/slices/newsSlice';
import {
  Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ScrollToTop from '../common/ScrollToTop';

const Articles = () => {
  const { articles, totalPages, status, error } = useSelector((state) => state.articles);
  const location = useLocation()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const [currentPage, setCurrentPage] = useState(location?.state?.page || 1);
  const [inputPage, setInputPage] = useState('');
  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await dispatch(deleteArticleAsync(articleId));
      dispatch(getAllArticlesAsync(currentPage));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllArticlesAsync(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      <div className="news-content">
        <div className="container">
          <h1 style={{ fontSize: "45px", marginBottom: "20px", marginTop: "10px" }}>Останні новини</h1>
          <div className="news-wrap">
            {articles.map((article) => {
              const dateString = article.date;
              const date = new Date(dateString);

              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              const dateFormatter = new Intl.DateTimeFormat('uk-UA', options);

              const formattedDate = dateFormatter.format(date);
              return (
                <div className="news-element-rmk">
                  <Link style={{ marginBottom: "30px", color: "black" }} key={article.id} to={{
                    pathname: `/news/${article._id}`,
                    state: { page: currentPage }
                  }}>

                    <p style={{ fontSize: "14px" }}>Опубліковано: {formattedDate}</p>
                    <p style={{ fontSize: "24px" }}> {article.title} </p>

                  </Link>
                  {isAuth ? <button className="delete-button" onClick={() => handleDeleteArticle(article._id)}>Видалити</button> : null}

                </div>
              );
            })}
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Попередня
            </button>

            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Наступна
            </button>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              placeholder={`1-${totalPages}`}
            />
            <button onClick={() => handlePageChange(Number(inputPage))} disabled={!inputPage || inputPage === currentPage || inputPage > totalPages}>
              Перейти
            </button>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Articles;
