/**
 * Created by favcy on 28/02/18.
 */
import React from 'react';
import {MuiThemeProvider} from "material-ui";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {white} from 'material-ui/styles/colors'
import {Link} from 'react-router-dom';
import BaseComponent from "./BaseComponent";
import {removeLocalData} from "../sdk-js/Common/cache";

export default class RightMenu extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MuiThemeProvider>
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon color={white}/></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}

                >
                    <Link to={"/settings"}>
                        <MenuItem primaryText="My Account"/>
                    </Link>
                    <MenuItem primaryText="Sign out" onClick={() => {
                        this.logout();
                    }}/>
                </IconMenu>

            </MuiThemeProvider>
        )
    }

    logout() {
        this.props.history.push("/");
        removeLocalData("valuex-token");
    }
}
