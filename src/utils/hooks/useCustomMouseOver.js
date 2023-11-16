import { useEffect } from 'react';

const useCustomMouseOverHook = (works, worksWrapperRef) => {
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (!worksWrapperRef || !worksWrapperRef.current) {
        return;
      }

      const index = Array.from(worksWrapperRef.current.children).indexOf(e.currentTarget);
      if (e.target.dataset.id === 'def') {
        e.target.classList.add('hide');
        worksWrapperRef.current.children[index].querySelector('.works-element__info__hide').classList.remove('hide');
      }
    };

    const handleMouseOut = (e) => {
      if (!worksWrapperRef || !worksWrapperRef.current) {
        return;
      }

      const index = Array.from(worksWrapperRef.current.children).indexOf(e.currentTarget);
      if (e.target.dataset.id === 'dev') {
        e.target.classList.add('hide');
        worksWrapperRef.current.children[index].querySelector('.works-element__info').classList.remove('hide');
      }
    };

    const worksElements = worksWrapperRef.current ? Array.from(worksWrapperRef.current.children) : [];

    worksElements.forEach((element) => {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      worksElements.forEach((element) => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [works, worksWrapperRef]);
};

export default useCustomMouseOverHook;
