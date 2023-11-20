import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ScrollToTop from '../common/ScrollToTop';
import '../../assets/styles/admin.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import $api from '../../utils/api';

const Admin = () => {
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [statistics, setStatistics] = useState({})
  const successNotification = () => toast("Адміністратор успішно створений!")
  const failedNotification = () => toast("Виникла помилка!")

  useEffect(() => {
    if (!isAuth) {
      history.push('/login');
    }
  }, [isAuth, history]);

  useEffect(() => {
    loadStatictics()
  }, [])

  const addNewAdmin = async () => {
    try {
      await $api.post('/registration', { email: newAdminEmail, password: newAdminPassword })
      successNotification()
    } catch (error) {
      console.log(error);
      failedNotification()
    }
  };

  const loadStatictics = async () => {
    try {
      const result = await $api.get('/getStatistics')
      setStatistics(result)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <center><h2 className='admin-header'>Адміністративна панель користувача {user.email}</h2></center>
      <div className="admin-container">

        <div className='admin-container-left'>

          <div className='admin-section'>
            <h2 className='admin-subheader'>Додати нового адміністратора</h2>
            <input
              type='text'
              placeholder='Електронна пошта'
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className='admin-input'
            />
            <input
              type='password'
              placeholder='Пароль'
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              className='admin-input'
            />
            <button onClick={addNewAdmin} style={{ fontWeight: 700 }} className='admin-button'>Додати адміністратора</button>
          </div>
          <br /> <h2 className='admin-subheader'>Взаємодія з контеном</h2>
          <div className='admin-section'>
            <h2 className='admin-subheader'>
              <Link to="/works/create"><button className='admin-button'>Додати нову роботу</button></Link>
            </h2>
          </div>

          <div className='admin-section'>
            <h2 className='admin-subheader'>
              <Link to="/news/create"><button className='admin-button'>Додати нову статтю</button></Link>
            </h2>
          </div>

          <div className='admin-section'>
            <h2 className='admin-subheader'>
              <Link to="/news"><button className='admin-button' style={{ backgroundColor: "red" }}>Редагувати та видаляти статті</button></Link>
            </h2>
          </div>

          <div className='admin-section'>
            <h2 className='admin-subheader'>
              <Link to="/carousel"><button className='admin-button'>Керувати наповненням каруселі</button></Link>
            </h2>
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
        <div className='admin-container-right'>

          <center> <h2>Статистика</h2></center>
          <div className='admin-section'>
            <p className='admin-subheader' style={{ fontSize: 24 }}>
              Всього статей на сайті:<b> {statistics.data?.newsCount}</b>
            </p>
            <p className='admin-subheader' style={{ fontSize: 24 }}>
              Всього робіт на сайті: <b>{statistics.data?.worksCount}</b>
            </p>
            <p className='admin-subheader' style={{ fontSize: 24 }}>
              Всього переглядів статей: <b> {statistics.data?.viewsCount[0].totalViewCounter}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
