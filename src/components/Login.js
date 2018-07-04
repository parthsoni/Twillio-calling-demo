/**
 * Created by favcy-pc on 08-06-2017.
 */
import React from 'react';
import Redirect from "react-router-dom/es/Redirect";
import {getLocalData, setLocalData} from "../sdk-js/Common/cache";
import {generateToken, initValuex} from "../sdk-js/Common/common";
import "../App.css"
import "../styles/css/style.css"
import ImageAvatar from "./view/ImageAvatar";
import {
     Card,
    CardContent,
} from "@material-ui/core/umd/material-ui.production.min";
const historySupported = 'pushState' in window.history;

// Container
class Login extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: false,
        };

        let self = this;
        initValuex().then(
            response => {
                if (document.getElementById("login-container")) {
                    response.getApplication().addLoginButton("login-container");
                    response.subscribeEvents('onLogin', function (eventName, eventData) {
                        response.setToken(eventData);
                        setLocalData("valuex-token", eventData);
                        generateToken().then(function() {
                            self.setState({loading: true});
                        });

                    });
                }else {
                    console.log("div not found");
                }
            },
            error => {
                console.log(error);
            });

    }


    render() {

        console.log("dddd");
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        if (getLocalData("valuex-token") !== null && getLocalData("valuex-token") !== "") {
            return <Redirect to={from}/>;
        }

        return (<Card className="login-block">
            <CardContent>
                <ImageAvatar/>
                <div id="login-container"></div>
            </CardContent>
        </Card>);
    };
}

export default Login;
