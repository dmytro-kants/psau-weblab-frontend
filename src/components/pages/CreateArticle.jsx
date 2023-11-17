import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ScrollToTop from '../common/ScrollToTop'
import { useSelector } from 'react-redux';
import edjsParser from 'editorjs-parser';
import $api from '../../utils/api';
import Editor from '../common/Editor';
import '../../assets/styles/style.css'
import '../../assets/styles/edit-article.css'
import "../../assets/styles/editor.css";
const CreateArticle = () => {

  const [data, setData] = useState({});
  const [title, setTitle] = useState("")
  const isAuth = useSelector((state) => state.auth.isAuth)

  const createSuccessNotification = () => toast(`Новина успішно створена!`)
  const createFailedNotification = () => toast("Виникла помилка!")

  const onSave = async () => {
    try {
      const markup = parser.parse(data);
      await $api.post("/addArticle", { originalJSON: data, content: markup, title: title });
      createSuccessNotification()
    } catch (error) {
      createFailedNotification()
      console.log(error);
    }
  }

  const customParsers = {
    image: function (data, config) {
      return `<center><img src="${data.file.url}" alt="${data.caption}" /></center>`;
    },
  };
  const parser = new edjsParser(undefined, customParsers);

  if (!isAuth) {
    return <>нізя..</>
  }
  return (
    <div className="container">
      <center style={{ marginTop: "20px", marginBottom: "20px" }}><h1>Додати новину</h1></center>
      <div className="edit-article">
        <label>Назва:</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="editor">
      <Editor data={data} onChange={setData} editorblock="editorjs-container" />
      <button className="savebtn" onClick={onSave}>
        Save
      </button>
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

export default CreateArticle