import React from 'react';
import PropTypes from 'prop-types';
import {initValuex} from "../sdk-js/Common/common";
import {
    FormControl, Grid, withStyles, Typography, Card, Button,
    CardContent, InputLabel, Input, Snackbar,
} from "@material-ui/core/umd/material-ui.production.min";
import {Delete, Save} from "material-ui-icons";
import BaseComponent from "./BaseComponent";
import  ChipInput from "material-ui-chip-input";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding:'10px',
    },

    formControl: {
        margin: theme.spacing.unit,
    },

    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class Settings extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            tags:null,
            message:null,
            charges:null,
            open:false,
            wallet : null,
            link:null
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.pay = this.pay.bind(this);
        let self = this;
        initValuex().then(
            response => {
                let user = response.getUser();
                self.setState({sdk :response,
                    name:user.name,
                    description: user.relations ? user.relations[0].description:null,
                    charges:user.relations ? user.relations[0].charges:null,
                    tags: user.relations && user.relations[0].tags ? user.relations[0].tags.split(","):null})

                response.getWallet().then(
                    response => {
                        self.setState({wallet : response});
                    },
                    error => {

                    }
                )
            },
            error => {
            });
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    onChange = (tags) => {
        this.setState({tags: tags});
    };

    pay = () => {
        this.setState({message : "Redirect to payment page", open :true});
    };

    submitSettings = (e) => {
        let self = this;
        let data = {};
        data.name = this.state.name;
        data.description = this.state.description;
        data.tags = this.state.tags ? this.state.tags.toString():null;
        data.charges = this.state.charges;
        let user = this.state.sdk.getUser();
        this.state.sdk.updateProfile(data).then(
            response => {
                self.setState({message : "Profile updated successfully", open :true});
            },error => {

            });
    };

    createCallURL = function() {
        let self = this;
        this.state.sdk.createLink(this.state.link).then(
            response => {
                self.setState({message : "Call URL Added successfully", open :true});
            },error => {

            });
    };

    render() {
        const {classes} = this.props;

        if(this.state.name == undefined) {
            return "No data found";
        }

        if(!this.state.name) {
            return "Loading...";
        }

        return (
            <div className={classes.container}>
                <h3>{"Welcome " + this.state.name}</h3>
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={6000}
                    TransitionComponent={this.state.Transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />
                <Grid container className={classes.root} spacing={4}>
                    <Grid item sm={7} xs={12}>
                        <form action="/" method="POST" id="settings" onSubmit={(e) => this.submitSettings(e)}>
                            <FormControl fullWidth className={classes.formControl} aria-describedby="name-helper-text">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input id="name" value={this.state.name} onChange={(e) => this.handleChange(e, "name")}/>
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl} aria-describedby="name-helper-text">
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input id="description" value={this.state.description}
                                       onChange={(e) => this.handleChange(e, "description")}/>
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl} aria-describedby="name-helper-text">
                                <InputLabel htmlFor="tags">Skills</InputLabel>
                                <ChipInput id="tags"
                                           defaultValue={this.state.tags}
                                           onChange={(chips) => {
                                               this.onChange(chips)
                                           }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl} aria-describedby="name-helper-text">
                                <InputLabel htmlFor="charges">Charges / Minutes</InputLabel>
                                <Input id="charges" value={this.state.charges}
                                       onChange={(e) => this.handleChange(e, "charges")}/>
                            </FormControl>

                            <FormControl className={classes.formControl} aria-describedby="name-helper-text">
                                <Button onClick={(e) => this.submitSettings(e)}
                                        variant="contained" size="Large" color="primary" className={classes.button}>
                                    <Save className={classes.iconSmall}/>
                                    Save
                                </Button>
                            </FormControl>
                        </form>
                    </Grid>
                    {this.state.wallet && <Grid class="credit-box" item sm={4} xs={12} style={{'float':'right'}}>
                        <Grid container>
                            <Card>
                                <CardContent>
                                    <Typography variant="headline" component="h3">
                                        Credits -- {this.state.wallet['credits']}
                                    </Typography>
                                    <Typography component="p">
                                        Top Up Credits
                                    </Typography>
                                    <Button variant="contained" color="secondary" className={classes.button}
                                            onClick={() => this.pay()}>
                                        Pay
                                        <Delete className={classes.rightIcon}  />
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>}
                </Grid>
                <div style={{'margin-top':'20px', 'border-top':'#ddd'}}>
                    <h3>{"Create Your Call URL"}</h3>
                    <form action="/" method="POST" id="create-call-url" onSubmit={(e) => this.createCallURL(e)}>
                        <FormControl fullWidth className={classes.formControl} aria-describedby="name-helper-text">
                            <InputLabel htmlFor="url">Call URL</InputLabel>
                            <Input id="link" value={this.state.link} onChange={(e) => this.handleChange(e, "link")}/>
                        </FormControl>
                        <FormControl className={classes.formControl} aria-describedby="name-helper-text">
                            <Button onClick={(e) => this.createCallURL(e)}
                                    variant="contained" size="Large" color="primary" className={classes.button}>
                                <Save className={classes.iconSmall}/>
                                Create Call URL
                            </Button>
                        </FormControl>
                    </form>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);