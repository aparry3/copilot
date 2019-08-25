import React from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import {Logo} from './util';
import {useStyles} from './styles'

export const Sidebar = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
              paper: clsx(classes.drawerPaper)
            }}
        >
            <Logo />
            <SidebarList >
                <Link list_key="home" to="/">Home</Link>
                <Link list_key="exercises" to="/exercises">Exercises</Link>
            </SidebarList>

        </Drawer>
    );
}


export const SidebarList = (props) => {
    return (
        <List>
            {props.children.map(child => {
                return <ListItem key={child.props.list_key}>{child}</ListItem>;
            })}
        </List>
    );
}
