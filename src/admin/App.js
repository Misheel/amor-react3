import React from 'react';
import { Route, Switch } from "react-router-dom";
import MenuCategory from './MenuCategory';
import Menu from './Menu';
import Navbar from './Navbar';
import StaticText from './StaticText';
import Post from './Post';
import PostForm from './PostForm';

function AdminApp() {
    return (
        <>
            <Navbar />
            <div style={{height: '6rem'}}/>
            <Switch>
                <Route path="/admin/menuCategory" exact component={MenuCategory} />
                <Route path="/admin/menu/:categoryId" exact component={Menu} />
                <Route path="/admin/menu/:categoryId/:parentId" exact component={Menu} />
                <Route path="/admin/staticText" exact component={StaticText} />
                <Route path="/admin/post" exact component={Post} />
                <Route path="/admin/post/new" exact component={PostForm} />
                <Route path="/admin/post/edit/:id" exact component={PostForm} />
            </Switch>
        </>
    );
}

export default AdminApp;
