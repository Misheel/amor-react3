import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebApp from './web/App';
import AdminApp from './admin/App';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminApp} />
        <Route path="/" component={WebApp} />      
      </Switch>      
    </Router>    
  );
}

export default App;
