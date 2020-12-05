import React from 'react'

import {ViewImage} from './view_image'

import {styles} from './view_images.styles'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(styles)

export const ViewImages = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.viewImagesContainer}>
            {props.images.map(image => {
                return (
                    <ViewImage image={image}/>
                )
            })}
        </div>
    )
}
