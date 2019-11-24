import React, {useState, useEffect} from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/divider';
import {ExitToApp} from '@material-ui/icons'
import TableChartIcon from '@material-ui/icons/TableChart'
import ViewListIcon from '@material-ui/icons/ViewList'
import { Link } from "react-router-dom";
import {Logo} from './util';
import {makeStyles} from '@material-ui/core/styles'
import {SIDEBAR_WIDTH} from './styles'
import {logout, setActivePage} from '../actions'
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({

  drawer: {
    minWidth: '65px',
    width: '65px',
    background: "#2866ab",
    display: 'flex',
    flexDirection: 'column',
    color:"white",
    background: theme.palette.primary.main,
    whiteSpace: 'no-wrap',
    overflow: 'hidden',
    '&:hover': {
        width: '180px',
        minWidth: '180px'
    }
  },
  sidebarHeader: {
      height: '70px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'

  },
  sidebarFooter: {
      height: '65px',
      width:"100%"
  },
  footerMenuItem: {
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: 'white'
  },
  footerItem: {
      margin: '5px'
  },
  link: {
      color: "white",
      textDecoration: "none",
      "&:hover": {
          color:"white",
          textDecoration: "none",
      },
  },
  menuItem: {
      height:'65px',
      minHeight: "65px",
      fontWeight: "300",
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
          background: theme.palette.primary.dark
      }
  },
  sidebarIcon: {
      minWidth: '65px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  sidebarContent: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
  },
  sidebarTitle: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
      fontWeight: '100',
      fontSize: '30px',
      letterSpacing: '2.5px'
  },
  selected: {
      background: theme.palette.primary.dark
  },
  toolbar: theme.mixins.toolbar,
}));
export const Sidebar = connect(
    state => ({
        selected_page: state.app.active_page
    }),
    dispatch => ({
        setActivePage: (page) => dispatch(setActivePage(page))
    })
)((props) => {
    const classes = useStyles();
    let {selected_page} = props
    useEffect(() => {
        console.log("effect")
        let page = window.location.pathname.match(/trainer\/(\w+)/i)[1]
        props.setActivePage(page)
    }, [])
    return (
        <div className={classes.drawer}>
            <div className={classes.sidebarHeader} >
                <div className={classes.sidebarIcon}><Logo style={{height:'40px'}}/></div>
                <div className={classes.sidebarTitle}><span>copilot</span></div>
            </div>
            <Divider variant="middle"/>
            <div className={classes.sidebarContent}>
                <div className={classes.menuItemList}>
                    <Link className={classes.link} color="inherit" list_key="exercises" to={`${props.path}/exercises`}>
                        <div onClick={() => props.setActivePage('exercises')}
                            className={selected_page == 'exercises' ? clsx(classes.menuItem, classes.selected) : clsx(classes.menuItem)}>
                            <div className={classes.sidebarIcon}><ViewListIcon /></div>
                            <div><span>Exercises</span></div>
                        </div>
                    </Link>
                    <Link className={classes.link}  color="inherit" list_key="programs" to={`${props.path}/programs`}>
                        <div onClick={() => props.setActivePage('programs')}
                            className={selected_page == 'programs' ? clsx(classes.menuItem, classes.selected) : clsx(classes.menuItem)}>
                            <div className={classes.sidebarIcon}><span><TableChartIcon /></span></div>
                            <div><span>Programs</span></div>
                        </div>
                    </Link>
                </div>
                <div className={classes.sidebarFooter}>
                <Divider variant="middle"/>
                    <div className={classes.menuItem} button onClick={() => logout()}>
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
})


export const SidebarList = (props) => {
    return (
        <List>
            {props.children.map(child => {
                return <ListItem key={child.props.list_key} button>{child}</ListItem>;
            })}
        </List>
    );
}
