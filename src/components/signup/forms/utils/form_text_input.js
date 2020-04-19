import React, {useState, useRef} from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formTextInputContainer: {
        padding: '10px',
        dispaly: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    label: {
        color: theme.text.light,
        fontSize: '16px',
        display: 'flex',
        padding: '2px'
    },
    inputContainer: {
        display: 'flex'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: `${theme.text.light} 1px solid`,
        borderRadius: '5px'
    }
})
const useStyles = makeStyles(styles);


export const FormTextInput = props => {
    let classes = useStyles()
    return (
        <div className={classes.formTextInputContainer}>
            <div className={classes.label}><span>{props.label || props.name}</span></div>
            <div className={classes.inputContainer}>
                <input className={classes.input} name={props.name} onChange={props.onChange} value={props.value} placeholder={props.placeholder} />
            </div>
        </div>
    )
}
