import React from 'react'
import clsx from 'clsx'

import {makeStyles, withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    programListHeader: {
        width: '100%',
        height: '15%',
        background: theme.palette.background.light,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        fontSize: '40px',
        fontWeight: 100,
        textAlign: 'center'
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    }
})

let useStyles = makeStyles(styles)

export function ProgramHeader(props) {
    let classes = useStyles()
    return(
        <div className={classes.programListHeader}>
            {
                props.children
            }
            <hr className={classes.hr}/>
        </div>
    )

}
