import React, { useEffect, useState } from "react";
import "../../assets/styles/editor.css";
import Editor from "../common/Editor";
import edjsParser from "editorjs-parser";
import $api from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import '../../assets/styles/style.css'
import '../../assets/styles/edit-article.css'
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";
import ScrollToTop from "../common/ScrollToTop";

function EditArticle() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [title, setTitle] = useState("")
  const isAuth = useSelector((state) => state.auth.isAuth)
  const editSuccessNotification = () => toast("Новина успішно оновлена!")
  const editFailedNotification = () => toast("Виникла помилка!")

  const onSave = async () => {
    try {
      const markup = parser.parse(data);
      await $api.put("/updateArticle", { id: id, originalJSON: data, content: markup, title: title });
      editSuccessNotification()
    } catch (error) {
      editFailedNotification()
      console.log(error);
    }
  }

  const getSingleArticle = async (id) => {
    try {
      const result = await $api.get(`/getSingleArticle?id=${id}`);
      setData(result.data.originalJSON);
      setTitle(result.data.title)
      setDataFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleArticle(id);
  }, [id]);

  const customParsers = {
    image: function (data, config) {
      return `<center><img src="${data.file.url}" alt="${data.caption}" /></center>`;
    },
  };
  const parser = new edjsParser(undefined, customParsers);

  if (!isAuth) {
    return <div className='spiner-container'>
      <InfinitySpin
        width='200'
        color="#4fa94d"
      />
    </div>
  }
  return (
    <div className="container">
    <div className="editor">
      {dataFetched && (
        <>
          <Link
            className="back-to-works-link"
            to={{
              pathname: `/news/${id}`,
            }}
          >
            Назад до новини
          </Link>
          <div className="edit-article">
            <label>Назва:</label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <Editor data={data} onChange={setData} editorblock="editorjs-container" />
          <button className="savebtn" onClick={onSave}>
            Save
          </button>
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
        </>
      )}
      <ScrollToTop />
    </div>
    </div>
  );
}

export default EditArticle;
