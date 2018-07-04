import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from "react-router-dom/es/Link";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function CallHistoryCard(props) {
    const { classes } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        Call Id: {props.call.id}
                        <div style={{'float':'right'}}>{"Final Status: "+ props.call.current_status}</div>
                    </Typography>
                    <Typography variant="headline" component="h2">
                        {props.call.caller_name && props.call.caller_name!="" ? "Caller Name: " + props.call.caller_name : "Callee Name: " + props.call.callee_name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Duration: {props.call.duration}
                    </Typography>
                    <Typography component="p">
                        Caller Credit Spent/Earned : {props.call.caller_credit_spent}
                    </Typography>
                    <Typography component="p">
                        Callee Credit Spent/Earned : {props.call.callee_credit_spent}
                    </Typography>
                    <Typography component="p">
                        Record URL : <a href={props.call.record_url} target='_blank'>{props.call.record_url}</a>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

CallHistoryCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CallHistoryCard);