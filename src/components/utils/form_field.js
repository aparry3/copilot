import clsx from 'clsx'
import React, {useEffect, useState} from 'react'

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
        fontSize: '14px',
        justifyContent: 'space-between'
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
    let {edit = true} = props
    let classes = useStyles()
    


    return (
        <>
        { (!!edit || !!props.value) && (
            <div className={classes.formFieldContainer}>
                { props.condition === undefined || props.condition ? (
                    <>
                        <div className={classes.formFieldHeader}>
                            <div className={classes.formFieldTitle}><span>{props.title.toUpperCase()}</span></div>
                            <div className={classes.formFieldAction}>{props.action}</div>
                        </div>
                        <div className={classes.formFieldContent}>
                            { !!props.children && !props.children.length ? props.children : !!edit ? props.children[0] : props.children[1]}
                        </div>
                    </>
                ) : !!props.onClick && (
                    <div className={clsx(classes.formFieldHeader, classes.emptyForm)}>
                        <span onClick={props.onClick}>{!!props.add_text ? props.add_text : `Add ${props.title}...`}</span>
                    </div>
                )}
            </div>
        )}
        </>
    )

}
