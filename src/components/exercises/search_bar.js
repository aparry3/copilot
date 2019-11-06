import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../../actions';
import {AppBar, Toolbar, Typography, InputBase, TextField} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add'
import {SIDEBAR_WIDTH} from '../styles';

const useStyles = makeStyles(theme => ({
    searchBar: {
        width: `100%`,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        height: '15%',
        background: theme.palette.background.light
    },
    search: {
        width: '80%',
        display: 'flex',
        justifyContent:'flex-start',
        alignItems: 'center',
        fontSize: '35px',
        color: theme.text.secondary
    },
    icon: {
        width: '60px',
        height: '60px'
    },
    newExercise: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        textAlign: 'center',
        fontSize: '20px',
        background: theme.palette.background.light,
        color: theme.text.secondary,
        opacity:0.1,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main,
            opacity: 0.5
        }
    },
    searchInput: {
        background: theme.palette.background.light,
        border: 'none',
        flexGrow:1,
        outline: 'none',
        color: theme.text.primary,
        '&::placeholder': {
            color: theme.text.secondary
        }
    }
}));


const SearchBarView = (props) => {
    let classes = useStyles();
    return (
        <div className={classes.searchBar} >
            <div className={classes.search}>
                <div >
                    <SearchIcon className={classes.icon} />
                </div>
                <input
                className={classes.searchInput}
                placeholder="Search Exercises…"
                value={props.filter}
                onChange={(e) => props.setFilter(e.target.value)}
                />
            </div>
            <div className={classes.newExercise} onClick={props.onNewExercise}>
                <span><AddIcon className={classes.icon}/> Add Exercise</span>
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
