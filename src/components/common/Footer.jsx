import React from 'react'
import "../../assets/styles/style.css"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../utils/slices/authSlice';

const Footer = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);
    const history = useHistory()
    const handleLogout = () => {
        dispatch(logoutAsync({ user })).then(() => {
            history.push('/login');
        })

    };

    return (
        <footer className="footer">
            <div className="footer-background">
                <div className="container">
                    <div className="footer-flex">
                        <div className="footer-left" style={{ paddingTop: "5px" }}>
                            <div className="footer-navbar">
                                (C) ЛАБОРАТОРІЯ ВЕБТЕХНОЛОГІЙ І ХМАРНИХ ОБЧИСЛЕНЬ
                            </div>
                        </div>
                        <div class="footer-right" style={{ paddingTop: "5px" }}>

                            {isAuth ?
                                (<><Link style={{ color: "white", fontSize: "20px", paddingRight: "20px" }} to="/admin">Адмін-панель </Link>
                                    <button onClick={handleLogout}>Вийти</button></>) :
                                <Link style={{ color: "white" }} to="/login">Вхід для адміністратора</Link>}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
