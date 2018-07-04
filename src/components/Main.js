import React from 'react';
import BaseComponent from "./BaseComponent";
import {AppBar, MuiThemeProvider} from "material-ui";
import {SideBar} from "./SideBar";
import {Route} from "react-router-dom";
import RightMenu from './RightMenu';
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import CallHistory from "./CallHistory";
import {initValuex} from "../sdk-js/Common/common";
import CallURLs from "./CallURLs";

export default class Main extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {open: true, cardProperty: "240px", sdk:null};
        this.handleToggle = this.handleToggle.bind(this);

    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        onLeftIconButtonClick={this.handleToggle}
                        title="Value Connect - Demo"
                        className="app-bar-wrapper"
                        iconElementRight={<RightMenu history = {this.props.history}/>}
                    />
                    <SideBar {...this.state}/>
                    <div className="main-container" style={{left: this.state.cardProperty}}>
                        <Route path="/home" component={Home}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/(settings|)/"component={Settings}/>
                        <Route path="/call-history" component={CallHistory}/>
                        <Route path="/call-urls" component={CallURLs}/>

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    handleToggle() {
        this.state.cardProperty = this.state.cardProperty === "0px" ? "240px" : "0px";
        this.setState({open: !this.state.open});
    }
}
