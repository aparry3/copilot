import React, {useEffect, useState, useRef} from 'react'
import update from 'immutability-helper'

import { DndProvider, useDrop } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import ViewImages from '../view_images'


import {styles} from './images_upload.styles'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(styles)

export const ImagesUpload = (props) => {
    const classes = useStyles()
    const input_ref = useRef(null)
    const name_prefix = props.exercise_name.toLowerCase().replace(' ', '_')
    const [images, setImages] = useState([])

    useEffect(() => {
        async function preview() {
            setImages(props.images.concat(props.new_images))
        }
        preview()
    }, [props.new_images, props.images])

    const [{isOver, canDrop}, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop: async (item, monitor) => {
            addImages(item.files)
        },
        hover: (item, monitor) => {
            // console.log(monitor.getItem())
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    function addImages(files) {
        console.log([...files])
        const images = [...files].map((f, i) => {
            const name = `${name_prefix}_${Date.now()}_${i}`
            return [name, f]
        })

        props.addImages(images)

    }

    function handleChange(e) {
        addImages(e.target.files)
    }

    return (
        <div ref={drop} className={classes.imagesUploadContainer} onClick={() => input_ref.current.click()}>
            <input ref={input_ref} className={classes.input} type="file" multiple onChange={handleChange}/>
            {!!images && images.length ? <ViewImages handleDelete={props.removeImage} images={images}/> : (
                <div className={classes.emptyImages}>
                    <PhotoLibraryIcon className={classes.imageUploadIcon}/>
                </div>
            )}
            <div className={classes.uploadImagesText}>
                <div>Drop files here or Click to Upload...</div>
            </div>
        </div>
    )
}
