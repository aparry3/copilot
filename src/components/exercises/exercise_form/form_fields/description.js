import clsx from 'clsx'
import React from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const Description = props => {
    let classes = useStyles()

    return (
        <div className={classes.formSectionContainer}>
            <div className={clsx(classes.formSection, classes.description)}>
                <div className={classes.formSectionHeader}><span>Description</span></div>
                <div className={classes.formSectionInputContainer}><textarea autocomplete="off" className={classes.formSectionInput} id='description' name='description' onChange={props.onChange} value={props.value} /></div>
            </div>
        </div>
    )
}
