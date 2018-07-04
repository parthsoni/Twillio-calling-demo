import React from 'react';
import PropTypes from 'prop-types';

import Tags from "../Tags";
import {
    Button, Card, CardActions, CardContent, CardMedia,
    Typography, withStyles
} from "@material-ui/core/umd/material-ui.production.min";
import CommunicationCall from "material-ui/svg-icons/communication/call";


const styles = {
    card: {
        width: 350,
        height: 550,
        padding: 5,
        margin: 5
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

function UserCard(props) {
    const {classes} = props;
    const image = require('../../images/avatar-2.png');
    const background = Math.floor(Math.random() * 10) > 5 ? require('../../images/1.png') :
        require('../../images/3.png');

    console.log(props.user.relations);
    return (
        <div style={{'float': 'left', 'position': 'relative'}} className="profile-card">
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={background}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div className="profile-block"><img
                        src={null != props.user.profile_pic ? props.user.profile_pic : image}
                        className="circle responsive-img activator card-profile-image cyan lighten-1"/>
                        {props.user.status == "ONLINE" ? <span className="dot dot-green"></span> :
                            <span className="dot dot-offline"></span>}
                        <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}
                                style={{'margin-top': '-50px', 'right': '-178px'}}
                                onClick={() => props.call(props.user.id)}>
                            <CommunicationCall style={{'color': '#fff'}}/>
                        </Button>
                    </div>
                    <Typography variant="headline" component="h3">
                        {props.user.name}
                    </Typography>
                    {props.user.relations  &&
                    <div style={{'height': '100px','width':'250px','font-size':'14px', 'text-overflow': 'ellipsis', 'white-space': 'pre-line',
                        'overflow': 'hidden'}}>{props.user.relations[0].description}</div>}
                    {props.user.relations &&
                    <div style={{'margin-top': '10px', 'color': '#fff'}}>
                        <Typography component="h4">
                        </Typography><Tags tags={props.user.relations}/></div>}

                </CardContent>
                <CardActions style={{'position': 'absolute', 'right': '0', 'bottom': '0'}}>
                    <Button
                        onClick={() => props.profile(props.user.relations[0].links[0].link)}
                        color="secondary" aria-label="edit" className={classes.button}>
                        Read More
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);