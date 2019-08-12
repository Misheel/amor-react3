import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg navbar-light bg-light">            
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/menuCategory">Цэс</Link>
                    </li>                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/staticText">Бичвэр</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/post">Нийтлэл</Link>
                    </li>
                </ul>                
            </div>
        </nav>
    );
}

export default Navbar;
