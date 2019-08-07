import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav class="navbar navbar-dark bg-dark fixed-top navbar-expand-lg navbar-light bg-light">            
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/admin/menuCategory">Цэс <span class="sr-only">(current)</span></Link>
                    </li>                    
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/blog">Блог</Link>
                    </li>
                </ul>                
            </div>
        </nav>
    );
}

export default Navbar;
