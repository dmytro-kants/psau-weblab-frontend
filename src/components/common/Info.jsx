import React, { useState, useEffect } from 'react';
import { tabsData } from '../../utils/data';


const Info = () => {
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % tabsData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentInfoIndex]);

  const handleInfoItemClick = (index) => {
    setCurrentInfoIndex(index);
  };

  return (
    <section className="info">
      <div className="container">
        <div className="works-info">
          <div className="works-left">КОРИСНА IНФОРМАЦIЯ</div>
          <div className="works-right"></div>
        </div>
        <div className="info-wrapper">
          <div className="info-item__wrapper">
            {tabsData.map((item, index) => (
              <a href={item.link} target="_blank" className="info-item-link" key={index}>
                <div className={`info-item ${index === currentInfoIndex ? '' : 'hide'}`}>
                  <div className="overlay-shadow">
                    <img src={item.imgSrc} alt="" />
                    <div className="tabs__wrap">
                      <p id="info-item__news">{item.heading}</p>
                      <p className="info-item__content">{item.content}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="info-list">
            {tabsData.map((item, index) => (
              <a onClick={() => handleInfoItemClick(index)} key={index}>
                <div className={`info-list__item ${index === currentInfoIndex ? 'active' : ''}`}>
                  <span>{item.heading}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
