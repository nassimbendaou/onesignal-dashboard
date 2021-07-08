import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const classes = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

const ProgressIndicator = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',marginLeft:props.left,marginBottom:100 }}>
            <CircularProgress className={classes.progress} />
        </div>
    )
}

export default ProgressIndicator;