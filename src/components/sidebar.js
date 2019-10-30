import React from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/divider';
import {ExitToApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
import {Wordmark} from './util';
import {makeStyles} from '@material-ui/core/styles'
import {SIDEBAR_WIDTH} from './styles'
import {logout} from '../actions'

const useStyles = makeStyles(theme => ({

  drawer: {
    width: SIDEBAR_WIDTH,
    background: "#2866ab",
    display: 'flex',
    flexDirection: 'column'
  },
  drawerPaper: {
    color:"white",
    width: SIDEBAR_WIDTH,
    background: theme.palette.primary.dark

  },
  sidebarHeader: {
      height: '70px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'

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
      height:"25px"
  },
  menuItem: {
      height:'28px',
      minHeight: "28px",
      fontWeight: "300"
},
  toolbar: theme.mixins.toolbar,
}));
export const Sidebar = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{
                root: classes.drawer,
                paper: classes.drawerPaper
            }}
            anchor='left'
        >
            <div className={classes.sidebarHeader} >
                <Wordmark />
            </div>
            <Divider variant="middle"/>
            <MenuList>
                <Link className={classes.link} color="inherit" list_key="dashboard" to={`${props.path}/`}>
                    <MenuItem classes={{root:classes.menuItem}}  button>
                        <ListItemText primary={<Typography variant="body2">Dashboard</Typography>} />
                    </MenuItem>
                </Link>
                <Link className={classes.link} color="inherit" list_key="exercises" to={`${props.path}/exercises`}>
                    <MenuItem classes={{root:classes.menuItem}}  button>
                        <ListItemText primary={<Typography variant="body2">Exercises</Typography>} />
                    </MenuItem>
                </Link>
                <Link className={classes.link}  color="inherit" list_key="programs" to={`${props.path}/programs`}>
                    <MenuItem classes={{root:classes.menuItem}} button>
                        <ListItemText primary={<Typography variant="body2">Programs</Typography>} />
                    </MenuItem>
                </Link>
            </MenuList>
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

        </Drawer>
    );
}


export const SidebarList = (props) => {
    return (
        <List>
            {props.children.map(child => {
                return <ListItem key={child.props.list_key} button>{child}</ListItem>;
            })}
        </List>
    );
}
