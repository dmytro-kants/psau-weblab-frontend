import React, { useEffect, useState } from 'react'
import "../../assets/styles/style.css"
import {
    Link,
    useLocation
} from "react-router-dom";



const Header = () => {
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(location.pathname)
    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location.pathname])

    return (
        <>

            <header className="header">
                <div className="header-background">
                    <div className="container">
                        <div className="header-content">
                            <div className="hamburger-menu">
                                <input id="menu__toggle" type="checkbox" />
                                <label className="menu__btn" htmlFor="menu__toggle">
                                    <span></span>
                                </label>
                                <ul className="menu__box">

                                    <li><Link className="menu__item" to="/">Головна</Link></li>
                                    <li><Link className="menu__item" to="/about">Про лабораторію</Link></li>
                                    <li><Link className="menu__item" to="/works">Список робіт</Link></li>
                                    <li><Link className="menu__item" to="/news">Новини</Link></li>
                                </ul>
                            </div>
                            <div className="navbar">
                                <Link to="/"><button className={currentPage === '/' ? "navbar-button active-page" : "navbar-button"}>Головна</button></Link>
                                <Link to="/about"><button className={currentPage === '/about' ? "navbar-button active-page" : "navbar-button"}>Про лабораторію</button></Link>
                                <Link to="/works"><button className={currentPage === '/works' ? "navbar-button active-page" : "navbar-button"}>Список робіт</button></Link>
                                <Link to="/news"><button className={currentPage === '/news' ? "navbar-button active-page" : "navbar-button"}>Новини</button></Link>
                            </div>
                            <div className="header-logo">
                                <a href="https://www.pdaa.edu.ua/" target="_blank" rel="noreferrer"><img src='https://res.cloudinary.com/dlbsa9dgi/image/upload/v1699789839/logo_waz8rp.png' alt="logo" width="237px" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header