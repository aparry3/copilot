import {connect} from 'react-redux'

import {Categories} from './categories'

const CategoriesContainer = connect(
    (state) => ({
        categories: state.constants.categories.sort((a,b) => a.id > b.id ? 1 : -1)
    }),
    null
)(Categories)

export default CategoriesContainer
