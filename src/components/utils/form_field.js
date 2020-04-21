import clsx from 'clsx'
import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles';
export const styles = theme => ({
    formFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
        padding: '10px'
    },
    formFieldContent: {
        display: 'flex',
        padding: '10px',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        borderRadius: '5px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        background: theme.palette.background.light
    },
    formFieldHeader: {
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px'
    },
    emptyForm: {
        cursor: 'pointer',
        padding: '5px',
        '&:hover': {
            background: theme.palette.background.main
        }
    }
})
const useStyles = makeStyles(styles)


export const FormField = props => {
    let classes = useStyles()
    return (
        <div className={classes.formFieldContainer}>
            { props.condition === undefined || props.condition ? (
                <>
                    <div className={classes.formFieldHeader}>
                        <span>{props.title.toUpperCase()}</span>
                    </div>
                    <div className={classes.formFieldContent}>
                        {props.children}
                    </div>
                </>
            ) : (
                <div className={clsx(classes.formFieldHeader, classes.emptyForm)}>
                    <span onClick={props.onClick}>{!!props.add_text ? props.add_text : `Add ${props.title}...`}</span>
                </div>
            )}
        </div>
    )

}