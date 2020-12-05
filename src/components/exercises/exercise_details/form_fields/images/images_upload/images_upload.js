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
    const [images, setImages] = useState([])
    useEffect(() => {
        async function preview() {
            let imgs = await previewAll(props.images)
            console.log(imgs)
            setImages(imgs)
        }
        preview()
    }, [props.images])
    const [{isOver, canDrop}, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop: async (item, monitor) => {
            let file = await fetch(item.files[0])
            props.addImages(item.files)
        },
        hover: (item, monitor) => {
            // console.log(monitor.getItem())
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    function handleChange(e) {
        props.addImages(e.target.files)
    }

    function previewImage(img) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.readAsDataURL(img)
        })
    }

    async function previewAll(imgs) {
        return Promise.all(imgs.map(i => previewImage(i)))
    }

    return (
        <div ref={drop} className={classes.imagesUploadContainer} onClick={() => input_ref.current.click()}>
            <input ref={input_ref} className={classes.input} type="file" multiple onChange={handleChange}/>
            {!!props.images && props.images.length ? <ViewImages images={images}/> : (
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
