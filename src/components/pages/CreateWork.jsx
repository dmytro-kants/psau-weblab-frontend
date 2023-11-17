import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import $api from '../../utils/api'
import ScrollToTop from '../common/ScrollToTop'
import '../../assets/styles/edit-work.css'

const CreateWork = () => {

    const DEFAULT_VALUES = {
        title: "", url: "", author: "", backgroundImage: ""
    }

    const [editedData, setEditedData] = useState(DEFAULT_VALUES);
    const isAuth = useSelector((state) => state.auth.isAuth)
    const createSuccessNotification = () => toast("Робота успішно створена!")
    const createFailedNotification = () => toast("Виникла помилка!")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSave = async () => {
        try {
            await $api.post('/addWork', editedData)
            setEditedData(DEFAULT_VALUES)
            createSuccessNotification()
        } catch (error) {
            console.log(error);
            createFailedNotification()
        }
    }

    if (!isAuth) {
        return <div>нізя..</div>
    }

    return (
        <div className="container">
            <center style={{ marginTop: "20px", marginBottom: "20px" }}><h1>Додати роботу</h1></center>
            <div className="edit-work">

                <label>Назва:</label>
                <input type="text" name="title" placeholder='Назва' value={editedData.title} onChange={handleChange} />

                <label>URL:</label>
                <input type="text" name="url" placeholder='Посилання на роботу' value={editedData.url} onChange={handleChange} />

                <label>Фонове зображення:</label>
                <input type="text" name="backgroundImage" placeholder='Посилання на фонове зображення' value={editedData.backgroundImage} onChange={handleChange} />

                <label>Автор:</label>
                <input type="text" name="author" placeholder='Антон Гришко' value={editedData.author} onChange={handleChange} />

                <button onClick={onSave}>Зберегти</button>
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
    )
}

export default CreateWork