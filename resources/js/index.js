import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "@assets/css/demo.css";
import "@assets/css/pe-icon-7-stroke.css";

import LoginPage from "@pages/Auth/LoginPage.jsx";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact render={props => <LoginPage {...props} />} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
