/**
 * Created by favcy-pc on 08-06-2017.
 */
import React from 'react';
import ProfileView from "./view/ProfileView";
import {getLocalData} from "../sdk-js/Common/cache";
import Redirect from "react-router-dom/es/Redirect";
import {initValuex} from "../sdk-js/Common/common";
const configuration = require('../sdk-js/json/config.json');


// Container
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: null,
            redirect: false
        };

        this.call = this.call.bind(this);
    }


    componentWillMount() {
        let keyword = (this.props.location.pathname).replace("/profile/", "");
        if (keyword === "" || keyword === "home" || keyword === "login") {
            this.setState({redirect: true})
        } else {
            let self = this;

            self.setState({loading: true});
            /* Get user profile info */
            let config = {
                style: {
                    primaryColor: 'red',
                    secondaryColor: 'blue'
                },
            }
            if (getLocalData(configuration.appId + "_authTo") !== "") {
                config.token = getLocalData(configuration.appId + "_authTo");
            }
            initValuex(config).then(
                response => {
                    self.setState({valuex: response});
                    response.setToken(getLocalData("valuex-token"));
                    response.getLink(keyword).then(function (response) {
                            if (undefined !== response) {
                                self.setState({
                                    user: response,
                                    loading: false
                                });
                            }
                        },
                        error => {
                            console.log(error);
                        });
                },
                error => {
                    console.log(error);
                });
        }
    }

    call(userId) {
        window.ValuexSDK.getInstance().connect({To: userId});
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={"/home"}/>
        }

        return (this.state.user &&
                <div style={{'width':'100%'}}>
            <ProfileView user={this.state.user} call={this.call}/>
                    </div>
        );
    };
}

export default Profile;
