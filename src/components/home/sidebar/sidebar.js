import clsx from 'clsx';
import { connect } from 'react-redux';
import React, {useState, useEffect} from 'react'

import Divider from '@material-ui/core/divider';
import {ExitToApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
import {Logo} from '../../utils';
import TableChartIcon from '@material-ui/icons/TableChart'
import ViewListIcon from '@material-ui/icons/ViewList'

import {makeStyles} from '@material-ui/core/styles'
import {styles} from './sidebar.styles'
const useStyles = makeStyles(styles)


export const Sidebar = (props) => {
    const classes = useStyles();
    let {active_page} = props

    useEffect(() => {
        let page = window.location.pathname.match(/\/(\w+)/i)[1]
        props.setActivePage(page)
    }, [])

    function setExercisePage() {
        props.setActivePage('exercises')
        props.hideExerciseForm()
    }
    return (
        <div className={classes.drawer}>
            <div className={classes.sidebarHeader} >
                <div className={classes.sidebarIcon}><Logo style={{height:'40px'}}/></div>
                <div className={classes.sidebarTitle}><span>copilot</span></div>
            </div>
            <Divider variant="middle"/>
            <div className={classes.sidebarContent}>
                <div className={classes.menuItemList}>
                    <Link className={classes.link}  color="inherit" list_key="programs" to={`/programs`}>
                        <div onClick={() => props.setActivePage('programs')}
                            className={active_page == 'programs' ? clsx(classes.menuItem, classes.selected) : clsx(classes.menuItem)}>
                            <div className={classes.sidebarIcon}><span><TableChartIcon /></span></div>
                            <div><span>Programs</span></div>
                        </div>
                    </Link>
                    <Link className={classes.link} color="inherit" list_key="exercises" to={`/exercises`}>
                        <div onClick={() => setExercisePage()}
                            className={active_page == 'exercises' ? clsx(classes.menuItem, classes.selected) : clsx(classes.menuItem)}>
                            <div className={classes.sidebarIcon}><ViewListIcon /></div>
                            <div><span>Exercises</span></div>
                        </div>
                    </Link>
                </div>
                <div className={classes.sidebarFooter}>
                <Divider variant="middle"/>
                    <div className={classes.menuItem} button onClick={props.logout}>
                        <div className={classes.sidebarIcon}>
                            <ExitToApp />
                        </div>
                        <div>
                            <span >Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
