import React, { useEffect, useState } from 'react'
import "../../assets/styles/style.css"
import {
    Switch,
    Route,
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

            <header class="header">
                <div class="header-background">
                    <div class="container">
                        <div class="header-content">
                            <div class="hamburger-menu">
                                <input id="menu__toggle" type="checkbox" />
                                <label class="menu__btn" for="menu__toggle">
                                    <span></span>
                                </label>
                                <ul class="menu__box">

                                    <li><Link className="menu__item" to="/">Головна</Link></li>
                                    <li><Link className="menu__item" to="/about">Про лабораторію</Link></li>
                                    <li><Link className="menu__item" to="/works">Список робіт</Link></li>
                                    <li><Link className="menu__item" to="/news">Новини</Link></li>
                                </ul>
                            </div>
                            <div class="navbar">
                                <Link to="/"><button className={currentPage === '/' ? "navbar-button active-page" : "navbar-button"}>Головна</button></Link>
                                <Link to="/about"><button className={currentPage === '/about' ? "navbar-button active-page" : "navbar-button"}>Про лабораторію</button></Link>
                                <Link to="/works"><button className={currentPage === '/works' ? "navbar-button active-page" : "navbar-button"}>Список робіт</button></Link>
                                <Link to="/news"><button className={currentPage === '/news' ? "navbar-button active-page" : "navbar-button"}>Новини</button></Link>
                            </div>
                            <div class="header-logo">
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