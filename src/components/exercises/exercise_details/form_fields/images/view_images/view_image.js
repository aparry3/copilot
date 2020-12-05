import React from 'react'

import {styles} from './view_images.styles'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(styles)


export const ViewImage = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.viewImage}>
            <div className={classes.delete} />
            <img className={classes.image} src={props.image} />
        </div>
    )
}
