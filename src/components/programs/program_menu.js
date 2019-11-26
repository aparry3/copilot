import clsx from 'clsx'

import AddIcon from '@material-ui/icons/Add'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import GetAppIcon from '@material-ui/icons/GetApp';
import {fade, makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from "react";


let styles = (theme) => ({
    programMenu: {
        height: '100%',
        background: theme.palette.background.light,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    programMenuOpen: {
        width: '20%',
        padding: '10px'
    },
    programMenuClosed: {
        width: '0px'
    },
    programMenuAction: {
        display: 'flex',
        alignItems: 'center',
        height: '30px'
    },
    programMenuHeader: {
        display: 'flex',
        alignItems: 'center',
        height: '100px',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        fontWeight: 300
    },
    programMenuItem: {
        minHeight: '40px',
        display: 'flex',
        padding: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main
        }
    },
    programMenuSection: {
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2px',
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    },
    programMenuSectionList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    programMenuSectionListItem: {
        justifyContent: 'center'
    },
    programMenuSectionIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 10px 0px 10px'
    },
    back: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer'
    },
    programMenuContent: {
    }
})


let useStyles = makeStyles(styles)

export const ProgramMenu = (props) => {
    let classes = useStyles()
    let {program} = props
    let class_group = props.open ? clsx(classes.programMenu, classes.programMenuOpen) : clsx(classes.programMenu, classes.programMenuClosed)

    function selectWeek(week, index) {
        props.selectPage("week")
        props.setCurrentWeek({id: week, index})
    }

    return (
        <div className={class_group}>
            <div className={classes.programMenuAction}>
                <div onClick={() => props.back()} className={classes.back}><KeyboardBackspaceIcon /><span>Back</span></div>
            </div>
            <div className={classes.programMenuHeader}>
                <span>{props.program.name}</span>
            </div>
            <div className={classes.programMenuContent}>
                <div className={classes.programMenuSection}>
                    <div onClick={() => props.selectPage("about")} className={classes.programMenuItem}>
                        <div className={classes.programMenuSectionIcon}><TrendingUpIcon /></div>
                        <div className={classes.programMenuSectionText}>
                            <span>About</span>
                        </div>
                    </div>
                </div>
                <div className={classes.programMenuSection}>
                    <div onClick={() => props.selectPage("program")} className={classes.programMenuItem}>
                        <div className={classes.programMenuSectionIcon}><FormatListNumberedIcon /></div>
                        <div className={classes.programMenuSectionText}>
                            <span>Weeks</span>
                        </div>
                    </div>
                    <div className={classes.programSectionList} >
                        <hr className={classes.hr}/>
                        {
                            program.weeks.map((w, i) => (
                                <div onClick={() => selectWeek(w, i)} className={clsx(classes.programMenuItem, classes.programMenuSectionListItem)}><span>Week {i + 1}</span></div>
                            ))
                        }
                        <div className={clsx(classes.programMenuItem, classes.programMenuSectionListItem)}><span>Add Week</span></div>
                    </div>
                </div>
                <div className={classes.programMenuSection}>
                    <div onClick={() => props.selectPage("export")} className={classes.programMenuItem}>
                        <div className={classes.programMenuSectionIcon}><GetAppIcon /></div>
                        <div className={classes.programMenuSectionText}>
                            <span>Export</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
