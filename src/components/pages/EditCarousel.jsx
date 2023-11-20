import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from '../common/ScrollToTop';
import { ToastContainer, toast } from 'react-toastify';
import '../../assets/styles/edit-carousel.css';
import { getAllCarouselItemsAsync, updateCarouselItemByIndex } from '../../utils/slices/carouselSlice';
import $api from '../../utils/api';

const EditCarousel = () => {

    const dispatch = useDispatch();
    const carouselItems = useSelector((state) => state.carousel.carouselItems);
    const isAuth = useSelector((state) => state.auth.isAuth);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleInputChange = (e, field) => {
        const updatedData = { [field]: e.target.value };
        dispatch(updateCarouselItemByIndex({ index: currentIndex, updatedData }))
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
    };

    const handleEdit = async () => {
        try {
            const response = await $api.put('/updateCarouselItem', {...carouselItems[currentIndex]})
            editSuccessNotification()

        } catch (error) {
            console.log(error);
            editFailedNotification()
        }
    }

    const editSuccessNotification = () => toast('Успіх!');
    const editFailedNotification = () => toast('Виникла помилка!');

    useEffect(() => {
        dispatch(getAllCarouselItemsAsync())
    }, [dispatch])

    if (!isAuth) {
        return null
    }

    return (
        <div className="container">
            <center style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h1>Редагувати Карусель</h1>
            </center>
            <div className="edit-carousel">

                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Назва"
                    value={carouselItems[currentIndex].title}
                    onChange={(e) => handleInputChange(e, 'title')}
                />

                <label>URL:</label>
                <input
                    type="text"
                    name="url"
                    placeholder="Посилання"
                    value={carouselItems[currentIndex].url}
                    onChange={(e) => handleInputChange(e, 'url')}
                />

                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    placeholder="Опис"
                    value={carouselItems[currentIndex].description}
                    onChange={(e) => handleInputChange(e, 'description')}
                />

                <label>Image:</label>
                <input
                    type="text"
                    name="image"
                    placeholder="Посилання на зображення"
                    value={carouselItems[currentIndex].image}
                    onChange={(e) => handleInputChange(e, 'image')}
                />

                <div className="carousel-info">
                    <p>Елемент {currentIndex + 1} з {carouselItems.length}</p>
                </div>

                <div className="edit-buttons">
                    <button className="edit-button" onClick={handleEdit}>Save</button>
                    <button className="prev-button" onClick={handlePrev}>Previous</button>
                    <button className="next-button" onClick={handleNext}>Next</button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ScrollToTop />
        </div>
    );
};

export default EditCarousel;
