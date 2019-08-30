import React from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import {Logo} from './util';
import {makeStyles} from '@material-ui/core/styles'
import {SIDEBAR_WIDTH} from './styles'

const useStyles = makeStyles(theme => ({

  drawer: {
    width: SIDEBAR_WIDTH,
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
  toolbar: theme.mixins.toolbar,
}));
export const Sidebar = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper
            }}
            anchor='left'
        >
            <Logo />
            <MenuList>
                <Link style={{ textDecoration: 'none' }}  list_key="home" to="/">
                    <MenuItem button>
                        <ListItemText primary="Home" />
                    </MenuItem>
                </Link>
                <Link style={{ textDecoration: 'none' }}  list_key="exercises" to="/exercises">
                    <MenuItem button>
                        <ListItemText primary="Exercises" />
                    </MenuItem>
                </Link>
                <Link style={{ textDecoration: 'none' }}  list_key="workouts" to="/workouts">
                    <MenuItem button>
                        <ListItemText primary="Workouts" />
                    </MenuItem>
                </Link>

            </MenuList>

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
