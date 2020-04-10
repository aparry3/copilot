import {connect} from 'react-redux'

import {AddBlock} from './add_block'

import {addBlock} from '../../../../../../actions/blocks'

const AddBlockContainer = connect(
    null,
    (dispatch, own_props) => ({
        addBlock: () => dispatch(addBlock(own_props.week_id, own_props.day_index))
    })
)(AddBlock)

export default AddBlockContainer
