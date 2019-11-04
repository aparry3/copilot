import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../../actions';
import {AppBar, Toolbar, Typography, InputBase, TextField} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {SIDEBAR_WIDTH} from '../styles';

const useStyles = makeStyles(theme => ({
    searchBar: {
        width: `100%`,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        height: '15%'
    },
    search: {
        width: '80%',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        }
    },
    searchIcon: {
        width: theme.spacing(7),
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
    },
    newExercise: {
        width: '20%'
    }
}));


const SearchBarView = (props) => {
    let classes = useStyles();
    return (
        <div className={classes.searchBar} >
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search Exercises…"
                value={props.filter}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => props.setFilter(e.target.value)}
                />
            </div>
            <div className={classes.newExercise} >
                <button className="btn btn-success" onClick={props.onNewExercise}>Add Exercise</button>
            </div>
        </div>
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
