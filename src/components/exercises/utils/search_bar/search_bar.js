import React from 'react';

import SearchIcon from '@material-ui/icons/Search';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './search_bar.styles'
const useStyles = makeStyles(styles);


export const SearchBar = (props) => {
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
