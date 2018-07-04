import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Avatar,withStyles} from "@material-ui/core/umd/material-ui.production.min";


const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 120,
        height: 120,
    },
};

function ImageAvatars(props) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            <Avatar
                src={require('../../images/avatar-2.png')}
                className={classNames(classes.avatar, classes.bigAvatar)}
            />
        </div>
    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);