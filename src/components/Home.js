// ./src/index.jsx
import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from "./Login";
import UserCard from "./view/UserCard";
import {HttpHandler} from "../sdk-js/Common/http";
import "../App.css"
import "../styles/css/style.css"
import "../styles/css/index.css"

import {getLocalData} from "../sdk-js/Common/cache";
import Grid from "@material-ui/core/Grid/Grid";
import Profile from "./Profile";
import Redirect from "react-router/Redirect";
import {initValuex} from "../sdk-js/Common/common";
import SearchBar from 'material-ui-search-bar'


const historySupported = 'pushState' in window.history;


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valuex: null,
            value: '',
            users: null
        }
        this.call = this.call.bind(this);
        this.showProfile = this.showProfile.bind(this);
        this.search = this.search.bind(this);
        let self = this;
        initValuex().then(
            response => {

                self.setState({valuex: response});
                response.getUsers().then(
                    response => {
                        self.setState({users: response})
                    },

                    error => {

                        console.log(error);
                    });
            },
            error => {

                console.log(error);
            });


    }

    call(calleeId) {
        this.state.valuex.connect({To: calleeId});
    }

    showProfile(keyword) {
        try {
            this.props.history.push('/profile/' + keyword);
        } catch (e) {
            console.log(e);
        }
    }


    search(searchValue) {
        let self = this;
        this.state.valuex.getUsers(searchValue).then(response => {
                self.setState({users: response})
            },

            error => {
                console.log(error);
            });
    }

    render() {
        const instance = this;

        let userList = [];

        {
            instance.state.users && instance.state.users.map((user) => {
                userList.push(<Grid item xs>
                    <UserCard key={user.id}
                              user={user}
                              call={instance.call}
                              profile={instance.showProfile}/>
                </Grid>);
            });
        }

        return (
            instance.props.location.pathname !== "/" && instance.props.location.pathname !== "/login" && instance.props.location.pathname !== "/home" ?
                <Profile  {...instance.props}/>
                : null !== instance.state.users && <div className="center-main-box">
                <div className="gray-bg">
                    <SearchBar
                        hintText={"Search by name, profile link"}
                        value={this.state.value}
                        onChange={(newValue) => this.setState({value: newValue})}
                        onRequestSearch={() => this.search(this.state.value)}
                    />
                    {<Grid container>
                        {userList}
                    </Grid>}
                </div>
            </div>
        );


    }
}