import React from 'react';
import PropTypes from 'prop-types';
import {
    Chip,
    withStyles
} from "@material-ui/core/umd/material-ui.production.min";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class Tags extends React.Component {

    constructor(props) {
        super(props);
    }

    handleDelete = data => () => {
        if (data.label === 'React') {
            alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
            return;
        }

        const chipData = [...this.state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({ chipData });
    };

    render() {
        const { classes } = this.props;
        let instance =this;
        let tagsString  = instance.props.tags;

        if(tagsString instanceof Array) {
            tagsString = tagsString[0].tags;
        }

        let tags = (undefined!==tagsString && null!==tagsString) ? tagsString.split(','):false;

        return (<div>
                {tags && tags.map(data => {
                    let avatar = null;

                    return (
                        <Chip
                            key={data}
                            avatar={avatar}
                            label={data}
                            className={classes.chip}
                        />
                    );
                })}
            </div>
        );
    }
}

Tags.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tags);