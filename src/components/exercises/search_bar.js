import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../../actions';
import {AppBar, Toolbar, Typography, InputBase, TextField} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {SIDEBAR_WIDTH} from '../styles';

const useStyles = makeStyles(theme => ({
    appBar: {
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        marginLeft: SIDEBAR_WIDTH,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
}));


const SearchBarView = (props) => {
    let classes = useStyles();
    return (
        <AppBar className={classes.appBar} position='fixed'>
            <Toolbar>
                <Typography  className={classes.title} variant="h6" noWrap>
                    Exercises
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />

                    </div>
                    <InputBase
                    placeholder="Filter Exercises…"
                    value={props.filter}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => props.setFilter(e.target.value)}
                    />
                </div>

                    <button className="btn btn-success" onClick={props.onNewExercise}>Add Exercise</button>
            </Toolbar>
        </AppBar>
    )

}

export const SearchBar = connect(
    (state) => {
        return {
            filter: state.exercises.filter
        }
    },
    (dispatch) => {
        return {
            setFilter: (filter_text) => dispatch(setFilter(filter_text))
        }
    }
)(SearchBarView)
