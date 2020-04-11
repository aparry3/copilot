import clsx from 'clsx'
import React from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './confirm_message.styles'
const useStyles = makeStyles(styles)


export const ConfirmMessage = props => {
    let classes = useStyles()

    return (
        <>
        {props.open && (
            <div className={classes.confirmContainer}>
                <div className={classes.closeMessage} onClick={() => props.close()}/>
                <div className={classes.messageContainer}>
                    <div className={classes.messageContent}>
                        <span>Are you sure you would like to {props.details.action} {props.details.element}?</span>
                    </div>
                    <div className={classes.messageActions}>
                        <div className={classes.messageActionContainer}>
                            <div onClick={() => props.confirm(props.action)} className={clsx(classes.messageAction, classes.messageConfirm)}>
                                <span>Confirm</span>
                            </div>
                        </div>
                        <div className={classes.messageActionContainer}>
                            <div onClick={() => props.close()} className={clsx(classes.messageAction, classes.messageCancel)}>
                                <span>Cancel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
