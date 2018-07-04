import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Person from 'material-ui/svg-icons/social/person';
import {Link} from 'react-router-dom';
import '../styles/css/left-sidebar.css';

const listItemStyle = {
    padding: "12px 16px 12px 55px"
};

export const SideBar = props => (
    <Drawer
        open={props.open}
        containerClassName="left-sidebar">
        <List>

            <Link to={"/settings"}>
                <ListItem
                    className="sidebar-items"
                    innerDivStyle={listItemStyle}
                    primaryText="My Account"
                    leftIcon={
                        <span className="item-icon-box">
                        <Person/>
                    </span>
                    }
                />
            </Link>
            <Link to={"/home"}>
                <ListItem
                    className="sidebar-items"
                    innerDivStyle={listItemStyle}
                    primaryText="Search"
                    leftIcon={
                        <span className="item-icon-box">
                            <Dashboard/>
                        </span>
                    }
                />
            </Link>

            <Link to={"/call-history"}>
                <ListItem
                    className="sidebar-items"
                    innerDivStyle={listItemStyle}
                    primaryText="My Call Logs"
                    leftIcon={
                        <span className="item-icon-box">
                    </span>
                    }
                />
            </Link>
            <Link to={"/call-urls"}>
                <ListItem
                    className="sidebar-items"
                    innerDivStyle={listItemStyle}
                    primaryText="My Call URLs"
                    leftIcon={
                        <span className="item-icon-box">
                    </span>
                    }
                />
            </Link>
        </List>
    </Drawer>
);
