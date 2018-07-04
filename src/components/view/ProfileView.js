import React from 'react';
import PropTypes from 'prop-types';
import Tags from "../Tags";
import {
    Card,
    CardMedia,
    Typography,
    CardActions,
    Button,
    withStyles,
    CardContent
} from "@material-ui/core/umd/material-ui.production.min";

const styles = {
    card: {
        margin: '10px auto',
        maxWidth: 500
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

function ProfileView(props) {
    const {classes} = props;
    const background = Math.floor(Math.random() * 10) > 5 ? require('../../images/1.png') :
        require('../../images/3.png');
    const image = require('../../images/avatar-2.png');
    let charges = props.user.charges.split(':');

    return (
        <div>
            <Card className={classes.card} key={props.user.id}>
                <CardMedia
                    className={classes.media}
                    image={background}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div className="profile-block"><img src={props.user.profile_pic ? props.user.profile_pic : image}
                                                        className="circle responsive-img activator card-profile-image cyan lighten-1"
                    />
                        {props.user.status == "ONLINE" ? <span className="dot dot-green"></span> :
                            <span className="dot dot-offline"></span>}
                    </div>
                    <Typography variant="headline" component="h3">
                        {props.user.name}
                    </Typography>
                    <Typography paragraph>
                        {props.user.description}
                    </Typography>
                    <Tags tags={props.user.tags}/>
                </CardContent>
                <CardActions style={{'position':'relative'}}>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={() => props.call(props.user.user_id)}>
                        Call Now
                    </Button>
                    <Typography variant="headline" component="h6" style={{'position':'absolute', 'right':'10px'}}>
                        Charges {charges[0] + " Per minute "}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    );
}

ProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileView);