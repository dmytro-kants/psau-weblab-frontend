import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAsync } from '../../utils/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/login.css'
import { InfinitySpin } from 'react-loader-spinner';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuth = useSelector((state) => state.auth.isAuth)

  const handleLogin = () => {
    try {
      dispatch(loginAsync({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      history.push('/admin')
    }
  }, [isAuth])

  if (isLoading) {
    return (
      <div className='spiner-container'>
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="input-group">
        <input type="text" placeholder="Пошта" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-button" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Авторизація...' : 'Ввійти'}
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
    </div>
  );
}

export default Login