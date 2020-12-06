import { connect } from 'react-redux'

import {addImages, removeImage} from '../../../../../../actions/images'
import {ImagesUpload} from './images_upload'


const ImagesUploadContainer = connect(
    state => ({
        new_images: state.images.images.map(i => i[1]),
        exercise_name: state.exercises.current_exercise.name
    }),
    dispatch => ({
        addImages: (images) => dispatch(addImages(images)),
        removeImage: (index) => dispatch(removeImage(index))
    })
)(ImagesUpload)

export default ImagesUploadContainer
