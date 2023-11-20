import React, { useEffect } from "react";
import Slider from "react-slick";
import SliderContent from "./SliderContent";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarouselItemsAsync } from "../../utils/slices/carouselSlice";


const SimpleSlider = () => {

    const carouselItems = useSelector((state) => state.carousel.carouselItems)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCarouselItemsAsync())
    }, [dispatch])
    
    const settings = {

        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="container">
            <Slider {...settings}>
                {carouselItems.map((element) => {
                    return <SliderContent key={element.title} imageUrl={element.image} title={element.title} content={element.description} />
                })}
            </Slider>
        </div>
    );
}

export default SimpleSlider