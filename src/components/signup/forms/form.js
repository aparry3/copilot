import clsx from 'clsx'
import React, {useState} from 'react'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Wordmark} from '../../utils'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './form.styles'
const useStyles = makeStyles(styles);


export const Form = props => {
    let classes = useStyles()

    function next() {
        if (props.condition && !!props.next) {
            props.next()
        }
    }
    function back() {
        if (!!props.back) {
            props.back()
        }
    }
    function confirm() {
        if (props.condition && !!props.confirm) {
            props.confirm()
        }
    }

    return (
        <div className={classes.signupForm}>
            <div className={classes.signupFormHeader}>
                <div className={classes.wordmark}>
                    <Wordmark height={75}/>
                </div>
            </div>
            <div className={classes.signupFormContent}>
                { !!props.title && (
                    <div className={classes.title}>
                        <span >{props.title}</span>
                    </div>
                )}
                { !!props.subtitle && (
                    <div className={classes.subtitle}>
                        <span>{props.subtitle}</span>
                    </div>
                )}
                {props.children}
            </div>
            <div className={classes.signupFormFooter}>
                <div onClick={back} className={classes.nextActive}>
                    { !!props.back && (<span className={classes.nextActive}><ArrowBackIcon /> Back</span>)}
                </div>
                { !!props.confirm && (
                    <div onClick={confirm} className={!!props.condition ? classes.nextActive : classes.nextInactive}>
                        <span>Confrim</span>
                    </div>
                )}
                { !!props.next && (
                    <div onClick={next} className={!!props.condition ? classes.nextActive : classes.nextInactive}>
                        <span>Next <ArrowForwardIcon /></span>
                    </div>
                )}
            </div>
        </div>
    )
}
