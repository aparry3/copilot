import clsx from 'clsx'
import React from 'react'

import {withStyles, makeStyles} from '@material-ui/core/styles';
import {styles} from './custom_select.styles'
let useStyles = makeStyles(styles)


export const MultiSelectView = props => {
    let classes = useStyles()

    return (
        <div className={classes.customSelectContainer}>
            <div className={classes.customSelect}>
            {
                props.values.map(v => (
                    <div className={classes.customSelectChip}>
                        <div className={clsx(classes.customSelectChipText, classes.view)}><span>{v}</span></div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
