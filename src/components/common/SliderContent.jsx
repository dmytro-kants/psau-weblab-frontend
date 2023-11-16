import React from 'react'

const SliderContent = ({ imageUrl, title, content }) => {
    return (
        <div class="container">
            <div class="slider-wrap">
                <div class="slider-item">
                    <div class="slider-item__image"><img src={imageUrl} alt="" /></div>
                    <div class="slider-item__info">
                        <div class="info1">{title}</div>
                        <div class="info2">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderContent