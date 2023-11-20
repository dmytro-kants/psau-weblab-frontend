import React from 'react'

const SliderContent = ({ imageUrl, title, content }) => {
    return (
        <div className="container">
            <div className="slider-wrap">
                <div className="slider-item">
                    <div className="slider-item__image"><img src={imageUrl} alt="" /></div>
                    <div className="slider-item__info">
                        <div className="info1">{title}</div>
                        <div className="info2">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderContent