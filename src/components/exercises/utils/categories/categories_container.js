import {connect} from 'react-redux';

import {Categories} from './categories'

const CategoriesContainer = connect(
    (state) => {
        return {
            categories_map: state.constants.categories
        }
    },
    null
)(Categories)

export default CategoriesContainer
