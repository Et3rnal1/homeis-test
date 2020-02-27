import React from 'react';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    label: {
        margin: '0.5rem'
    }
});

const Community = ({ name, tags, active, onChange }) => {
    const classes = useStyles();

    return <ExpansionPanel expanded={active} onChange={onChange}>
        <ExpansionPanelSummary>
            <Typography>{name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            {tags.map((tag, idx) =>
                <Chip className={classes.label} label={tag} key={idx} color={'primary'} size={'small'} />
            )}
        </ExpansionPanelDetails>
    </ExpansionPanel>
};

export default Community;