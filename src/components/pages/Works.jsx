import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkAsync, getAllWorksAsync } from '../../utils/slices/worksSlice';
import { Link, useLocation } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner';
import ScrollToTop from '../common/ScrollToTop';
import useCustomMouseOverHook from '../../utils/hooks/useCustomMouseOver';


const Works = () => {
  const { works, totalPages, status } = useSelector((state) => state.works);
  const location = useLocation();
  const page = location?.state?.page;
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [inputPage, setInputPage] = useState('');
  const [searchInput, setSearchInput] = useState(location?.state?.searchValue || '');
  const dispatch = useDispatch();

  const worksWrapperRef = useRef();
  useCustomMouseOverHook(works, worksWrapperRef);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = () => {
    dispatch(getAllWorksAsync({ currentPage, searchInput }));
  };

  const handleDeleteWork = async (articleId) => {
    try {
      await dispatch(deleteWorkAsync(articleId));
      handleSearch()
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  useEffect(() => {
    handleSearch()
  }, [currentPage]);

  useEffect(()=>{
    if (totalPages < 2){
      setCurrentPage(1) 
    }
  },[totalPages])

  if (status === "loading") {
    <div className='spiner-container'>
      <InfinitySpin
        width='200'
        color="#4fa94d"
      />
    </div>
  }

  return (
    <section className="works-list">
      <div className="container">
        <div className="works-list__info">
          <div id="works-title">ТВОРЧI РОБОТИ СТУДЕНТIВ</div><br />
          <div id="works-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quia et explicabo a repellat recusandae suscipit architecto cumque distinctio. Unde iusto accusantium modi tempore possimus dolorem dolore dolorum nesciunt. Voluptas eveniet sed nihil fuga similique, officia porro deserunt libero eius culpa distinctio, ipsa facilis repudiandae magnam ab ad, minima delectus rerum corrupti illum! Numquam veniam fugiat consequatur cumque natus amet possimus eligendi. Aliquam molestiae, delectus porro fugiat est minima dolore?</div>
          <br />
          <div className="search-container" style={{marginBottom:"20px"}}>
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button onClick={handleSearch}>Пошук</button>
          </div>
        </div>
        <div className="works-list__wrapper" ref={worksWrapperRef}>
          {works.map((work) => (
            <div key={work.id} className="works-content__a" style={{ backgroundImage: `url(${work.backgroundImage})`, backgroundSize: 'cover', position: 'relative' }}>
              <a href={work.url} className="works-element">
                <div className="works-element__info " data-id="def">{work.title}</div>
                <div className="works-element__info__hide hide" data-id="dev"></div>
              </a>
              {isAuth && (<>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteWork(work._id)}
                  style={{ position: 'absolute', top: '15px', right: '15px' }}
                >
                  X
                </button>
                <Link style={{ marginBottom: "30px", color: "white", position: 'absolute', top: '87%', right: '15px' }} to={{
                  pathname: `/works/${work._id}/edit`,
                  state: { page: currentPage, searchValue:searchInput },
                }}>Редагувати</Link>
              </>
              )}
            </div>
          ))}
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
      <ScrollToTop />
    </section>
  );
};

export default Works;
