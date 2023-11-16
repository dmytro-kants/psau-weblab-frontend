import React from "react";
import Slider from "react-slick";
import { sliderData } from "../../utils/data";
import SliderContent from "./SliderContent";


export default function SimpleSlider() {
    var settings = {

        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div class="container">
            <Slider {...settings}>
                {sliderData.map((element) => {
                    return <SliderContent imageUrl={element.imageUrl} title={element.title} content={element.content} />
                })}
            </Slider>
        </div>
    );
}