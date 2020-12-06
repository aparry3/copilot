import React from 'react'

import ClearIcon from '@material-ui/icons/Clear';

import {styles} from './view_images.styles'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(styles)


export const ViewImage = (props) => {
    const classes = useStyles()

    function handleDelete(e) {
        e.stopPropagation()
        e.preventDefault()

        props.handleDelete()
    }
    return (
        <div className={classes.viewImage}>
            <div onClick={handleDelete} className={classes.deleteBubble} >
                <ClearIcon className={classes.deleteIcon}/>
            </div>
            <img className={classes.image} src={props.image} />
        </div>
    )
}
