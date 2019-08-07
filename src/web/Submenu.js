import React, { useState, useEffect } from 'react';

function Submenu({parent}) {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetch('/api/menu/listByParentId?id='+parent.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setMenus(data);
            });
    }, []);

    return (
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {parent.name}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                    menus.map(menu => (
                        <a key={menu.id} class="dropdown-item" href="Event.html">{menu.name}</a>
                    ))
                }                                
            </div>
        </li>
    );
}

export default Submenu;
