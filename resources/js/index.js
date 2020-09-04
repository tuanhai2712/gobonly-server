import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "@assets/css/demo.css";
import "@assets/css/pe-icon-7-stroke.css";
import LoginPage from "@pages/Auth/LoginPage";
import { persistor, store } from "@store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import LoadingView from "@components/Loading/LoadingView";
import Layout from "@layouts/Layout";

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => {
  if (isLogin) {
    return <Route exact {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingView />} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <LoginPage {...props} />}
          />
          <PrivateRoute
            path="/admin/dashboard"
            component={Layout}
            isLogin={localStorage.getItem("token")}
          />
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
