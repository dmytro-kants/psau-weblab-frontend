import React, { useEffect, useRef } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from '../common/SimpleSlider';
import Info from '../common/Info';
import ScrollToTop from '../common/ScrollToTop';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getAllWorksAsync } from '../../utils/slices/worksSlice';
import { useDispatch, useSelector } from 'react-redux';
import useCustomMouseOverHook from '../../utils/hooks/useCustomMouseOver';


const Main = () => {

  const dispatch = useDispatch()
  const { works } = useSelector((state) => state.works);

  const worksWrapperRef = useRef();
  useCustomMouseOverHook(works, worksWrapperRef);

  useEffect(() => {
    dispatch(getAllWorksAsync({currentPage:1, searchInput:''}));
  }, [dispatch]);

  return (
    <div className='container'>
      <SimpleSlider />

      <section className="works">
        <div className="works-background">
          <div className="container">
            <div className="works-info">
              <div className="works-left">ТВОРЧI РОБОТИ СТУДЕНТIВ</div>
              <div className="works-right"><Link to="/works" >ВСІ РОБОТИ</Link></div>
            </div>
            <div className="works-content" ref={worksWrapperRef}>
              {works.map((work) => (
                <div key={work._id} className="works-content__a" style={{ backgroundImage: `url(${work.backgroundImage})`, backgroundSize: 'cover', position: 'relative' }}>
                  <a href={work.url} className="works-element">
                    <div className="works-element__info " data-id="def">{work.title}</div>
                    <div className="works-element__info__hide hide" data-id="dev"></div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
      <Info />
      <ScrollToTop />
    </div>

  )
}

export default Main