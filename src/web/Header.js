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
        <header class="main_menu home_menu">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <nav class="navbar navbar-expand-lg navbar-light">
                            <a class="navbar-brand" href="index.html"> <img src="img/logo.png" alt="logo" /> </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="ti-menu"></span>
                            </button>

                            <div class="collapse navbar-collapse main-menu-item justify-content-end"
                                id="navbarSupportedContent">
                                <ul class="navbar-nav align-items-center">
                                    {
                                        menus.map(a => (
                                            <React.Fragment key={a.id}>
                                                {
                                                    a.hasChildren
                                                        ?
                                                        <Submenu parent={a}/>
                                                        :
                                                        <li class="nav-item">
                                                            <a class="nav-link" href={a.link} target={a.target}>{a.name}</a>
                                                        </li>
                                                }
                                            </React.Fragment>

                                        ))
                                    }

                                    <li class="d-none d-lg-block">
                                        <a class="btn_2" href="#">learn more</a>
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
