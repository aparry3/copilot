import { connect } from 'react-redux'

import {addImages} from '../../../../../../actions/images'
import {ImagesUpload} from './images_upload'


const ImagesUploadContainer = connect(
    state => ({
        images: state.images.images
    }),
    dispatch => ({
        addImages: (images) => dispatch(addImages(images))
    })
)(ImagesUpload)

export default ImagesUploadContainer
