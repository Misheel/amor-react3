import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import SinglePost from "./page/SinglePost";

function Web() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/post/:id" exact component={SinglePost} />            
        </Switch>
    );
}

export default Web;
