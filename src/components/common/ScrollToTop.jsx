import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const scrollHandler = _debounce(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
            if (scrollTop > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, 200);
    
        const handleScroll = () => {
            requestAnimationFrame(scrollHandler);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo(0, 0);
        }
    };

    if (isVisible) {
        return (
            <div
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    background: 'black',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                &#9650;
            </div>
        );
    }

};

export default ScrollToTop;
