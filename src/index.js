import "../src/components/Home"
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch} from 'react-router-dom';
import Route from "react-router-dom/es/Route";
import Login from "./components/Login";
import Main from "./components/Main";
import { Provider } from 'react-redux';
import Redirect from "react-router-dom/es/Redirect";
import {getLocalData} from "./sdk-js/Common/cache";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import {initValuex} from "./sdk-js/Common/common";


function PrivateRoute ({component: Component, authed, ...rest}) {
    let k = <Route
        {...rest}
        render={(props) => (getLocalData("valuex-token") !== null && getLocalData("valuex-token")!=="")
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}  />}
    />
    return (k)
}


const historySupported = 'pushState' in window.history;
ReactDOM.render(

    <BrowserRouter  basename="/" forceRefresh={!historySupported}>
        <div>
            <Switch>
                <Route path='/login'   component={Login} />
                <Route path='/profile'   component={Profile} />
                <PrivateRoute exact path="/" component={Main} />
                <PrivateRoute path="/(call-urls|home|settings|call-history)/" component={Main} />
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('demo-app')

);

