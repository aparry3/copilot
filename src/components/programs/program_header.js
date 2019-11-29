import React from 'react'
import clsx from 'clsx'
import DehazeIcon from '@material-ui/icons/Dehaze';
import {makeStyles, withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    programListHeader: {
        width: '100%',
        height: '15%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '40px',
        fontWeight: 100,
        textAlign: 'center'
    },
    programHeaderContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexGrow: 1,
        fontSize: '30px',
        fontWeight: 400
    },
    programHeaderMenuIcon: {
        padding: '10px 20px 10px 0px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
            <div className={classes.programHeaderContent}>
                { !!props.show_menu && (<div onClick={props.onMenuClick} className={classes.programHeaderMenuIcon}><DehazeIcon /></div>) }
                { props.children }
            </div>
            <div className={classes.programHeaderAction}></div>
        </div>
    )

}