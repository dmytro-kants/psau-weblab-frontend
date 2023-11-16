import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ScrollToTop from '../common/ScrollToTop';

const Admin = () => {
  const history = useHistory()
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user)
  
  useEffect(() => {
    if (!isAuth) {
      history.push('/login')
    }
  }, [isAuth])

  return (
    <>
      <div>Адміністративна панель користувача {user.email}</div>
      <div><p>Додати нового адміністратора</p><button>
      </button></div>
      <ScrollToTop />
    </>
  )
}

export default Admin