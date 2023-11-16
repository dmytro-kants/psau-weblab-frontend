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
    dispatch(getAllWorksAsync(1));
  }, [dispatch]);

  return (
    <div className='container'>
      <SimpleSlider />

      <section class="works">
        <div class="works-background">
          <div class="container">
            <div class="works-info">
              <div class="works-left">ТВОРЧI РОБОТИ СТУДЕНТIВ</div>
              <div class="works-right"><Link to="/works" >ВСІ РОБОТИ</Link></div>
            </div>
            <div class="works-content" ref={worksWrapperRef}>
              {works.map((work) => (
                <div key={work.id} className="works-content__a" style={{ backgroundImage: `url(${work.backgroundImage})`, backgroundSize: 'cover', position: 'relative' }}>
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