import clsx from 'clsx'
import React, {useEffect, useState} from 'react';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import {makeStyles} from '@material-ui/core/styles';


const styles = theme => ({
    closeModal: {
        position: 'absolute',
        background: theme.palette.background.dark,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: .5,
    },
    container: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
        justifyContent: 'center',
        zIndex: 100
    },
    modalContainer: {
        padding: '200px 0px',
        overflow: 'auto',
        width: '50%',
        zIndex: 101
    },
    modal: {
        background: theme.palette.background.light,
        zIndex: 1,
        borderRadius: '5px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    modalHeader: {
        color: theme.text.light,
        display: 'flex',
        padding: '20px',
        alignItems:'center',
        fontSize: '24px'
    },
    modalContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        color: theme.text.primary,
        padding: '10px',
        // overflow: 'auto'
    },
    modalActions: {
        display: 'flex',
        alignItems: 'stretch',
        padding: '20px',
        justifyContent: 'space-around'
    },
    modalAction: {
        display: 'flex',
        borderRadius: '5px',
        alignItems: 'center',
        padding: '10px',
        justifyContent: 'center',
        cursor: 'pointer',
        width: '20%'
    },
    saveButton: {
        background: theme.accents.primary.main,
        color: theme.text.accents.primary.main,
        '&:hover': {
            background: theme.accents.primary.hover,
            color: theme.text.accents.primary.hover,
        }
    },
    cancelButton: {
        background: theme.accents.error.main,
        color: theme.text.accents.error.main,
        '&:hover': {
            background: theme.accents.error.hover,
            color: theme.text.accents.error.hover,
        }
    }

})

const useStyles = makeStyles(styles)


export const Modal = props => {
    let classes = useStyles()

    async function handleSubmit(e) {
        e.preventDefault();
        await props.save()
        props.close()
    }

    function handleCancel(e) {
        e.preventDefault()
        props.close()
    }

    return (
        <>
            { !!props.open && (
            <div className={classes.container} >
                <div className={classes.closeModal} onClick={props.close}/>
                <div className={classes.modalContainer}>
                    <div className={classes.modal} >
                        <div className={classes.modalHeader}>
                            <div className={classes.modalHeaderTitle}>
                                <span>{props.title}</span>
                            </div>
                        </div>
                        <div className={classes.modalContent}>
                            {props.children}
                        </div>
                        <div className={classes.modalActions}>
                            <div onClick={handleSubmit} className={clsx(classes.modalAction, classes.saveButton)}>
                                <CheckIcon className={classes.action} />
                            </div>
                            <div onClick={handleCancel} className={clsx(classes.modalAction, classes.cancelButton)}>
                                <ClearIcon className={classes.action} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>

    )
}
