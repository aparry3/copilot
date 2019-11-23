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
import {Wordmark} from './util';
import {makeStyles} from '@material-ui/core/styles'
import {SIDEBAR_WIDTH} from './styles'
import {logout, setActivePage} from '../actions'
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({

  drawer: {
    width: '65px',
    background: "#2866ab",
    display: 'flex',
    flexDirection: 'column',
    color:"white",
    background: theme.palette.primary.dark
  },
  sidebarHeader: {
      height: '70px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'

  },
  sidebarFooter: {
      height: '50px',
      position: "absolute",
      bottom: "0px",
      width:"100%"
  },
  footerMenuItem: {
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
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
      minHeight: "28px",
      fontWeight: "300"
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
        <div
            className={classes.drawer}>
            <div className={classes.sidebarHeader} >
                <Wordmark />
            </div>
            <Divider variant="middle"/>
            <div className={classes.menuItemList}>
                <Link className={classes.link} color="inherit" list_key="exercises" to={`${props.path}/exercises`}>
                    <div selected={selected_page=='exercises'} onClick={() => props.setActivePage('exercises')} className={classes.menuItem}>
                        <div><span>Exercises</span></div>
                    </div>
                </Link>
                <Link className={classes.link}  color="inherit" list_key="programs" to={`${props.path}/programs`}>
                    <div selected={selected_page=='programs'} onClick={() => props.setActivePage('programs')} className={classes.menuItem}>
                        <div><span>Programs</span></div>
                    </div>
                </Link>
            </div>
            <div className={classes.sidebarFooter}>
            <Divider variant="middle"/>
                <MenuItem className={classes.footerMenuItem} button onClick={() => logout()}>
                    <div className={classes.footerItem}>
                        <ExitToApp />
                    </div>
                    <div className={classes.footerItem}>
                        <Typography >Logout</Typography>
                    </div>
                </MenuItem>
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
