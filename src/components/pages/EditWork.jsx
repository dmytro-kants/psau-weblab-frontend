import React, { useEffect, useState } from 'react';
import '../../assets/styles/edit-work.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import $api from '../../utils/api';
import { Link, useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from '../common/ScrollToTop';

const EditWork = () => {
    const { id } = useParams();
    const location = useLocation();
    const page = location?.state?.page || 1;
    const [editedData, setEditedData] = useState({});
    const isAuth = useSelector((state) => state.auth.isAuth)
    const [dataFetched, setDataFetched] = useState(false);
    const editSuccessNotification = () => toast("Робота успішно оновлена!")
    const editFailedNotification = () => toast("Виникла помилка!")

    const getSingleWork = async (id) => {
        try {
            const result = await $api.get(`/getSingleWork?id=${id}`);
            setEditedData(result.data);
            console.log(result);
            setDataFetched(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleWork(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await $api.put(`/updateWork`, editedData);
            editSuccessNotification()
        } catch (error) {
            console.log(error);
            editFailedNotification()
        }

    };

    if (!isAuth) {
        return <div>нізя..</div>
    }

    return (
        <div className='container'>
            <Link className="back-to-works-link"
                to={{
                    pathname: '/works',
                    state: { page },
                }}
            >Назад до робіт</Link>


            {dataFetched && <div className="edit-work">
                <label>Назва:</label>
                <input type="text" name="title" value={editedData.title} onChange={handleChange} />

                <label>URL:</label>
                <input type="text" name="url" value={editedData.url} onChange={handleChange} />

                <label>Фонове зображення:</label>
                <input type="text" name="backgroundImage" value={editedData.backgroundImage} onChange={handleChange} />

                <label>Автор:</label>
                <input type="text" name="author" value={editedData.author} onChange={handleChange} />

                <button onClick={handleSave}>Зберегти</button>
            </div>}
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

export default EditWork;
