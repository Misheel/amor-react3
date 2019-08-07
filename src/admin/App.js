import React from 'react';
import { Route, Switch } from "react-router-dom";
import MenuCategory from './MenuCategory';
import Menu from './Menu';
import Navbar from './Navbar';

function AdminApp() {
    return (
        <>
            <Navbar />
            <div style={{height: '6rem'}}/>
            <Switch>
                <Route path="/admin/menuCategory" exact component={MenuCategory} />
                <Route path="/admin/menu/:categoryId" exact component={Menu} />
                <Route path="/admin/menu/:categoryId/:parentId" exact component={Menu} />
            </Switch>
        </>
    );
}

export default AdminApp;
