import React, { useState, useEffect } from 'react';
import Submenu from "./Submenu";

function Header() {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetch('/api/menu/list?categoryName=main')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setMenus(data);
            });
    }, []);

    return (
        <header className="main_menu home_menu">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a className="navbar-brand" href="index.html"> <img src="img/logo.png" alt="logo" /> </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="ti-menu"></span>
                            </button>

                            <div className="collapse navbar-collapse main-menu-item justify-content-end"
                                id="navbarSupportedContent">
                                <ul className="navbar-nav align-items-center">
                                    {
                                        menus.map(a => (
                                            <React.Fragment key={a.id}>
                                                {
                                                    a.hasChildren
                                                        ?
                                                        <Submenu parent={a}/>
                                                        :
                                                        <li className="nav-item">
                                                            <a className="nav-link" href={a.link} target={a.target}>{a.name}</a>
                                                        </li>
                                                }
                                            </React.Fragment>

                                        ))
                                    }

                                    <li className="d-none d-lg-block">
                                        <a className="btn_2" href="#">learn more</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
