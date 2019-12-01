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
        height: '100%',
        justifyContent: 'space-around',
        borderRadius: '5px',
        fontSize: '14px',
        background: theme.palette.background.light
    },
    search: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent:'flex-start',
        alignItems: 'center',
        padding: '5px',
        color: theme.text.secondary
    },
    icon: {
        width: '30px',
        height: '30px'
    },
    searchIconContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        background: theme.palette.background.light,
        border: 'none',
        borderRadius: '0px 5px 5px 0px',
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
                <div className={classes.searchIconContainer} >
                    <SearchIcon className={classes.icon} />
                </div>
                <input
                className={classes.searchInput}
                value={props.filter}
                onChange={(e) => props.setFilter(e.target.value)}
                />
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
