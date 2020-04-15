import {connect} from 'react-redux';

import {setFilter} from '../../../../actions';

import {SearchBar} from './search_bar'

const SearchBarContainer = connect(
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
)(SearchBar)

export default SearchBarContainer
