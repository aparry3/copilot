import React, {useState} from 'react'

import ViewImages from './view_images'
import ImagesUpload from './images_upload'
import { FormField } from '../../../../utils';


import {styles} from './images.styles'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(styles)


export const Images = (props) => {
    let [editing, setEditing] = useState(false)
    let [hover, setHover] = useState(false)
    const classes = useStyles()
    return (
        <FormField
            title='images'
            condition={!!props.value.length || editing}
            onClick={!!props.edit ? () => setEditing(true) : null}
            edit={props.edit}
            value={props.value}
            >
            <div className={classes.imagesContainer}>
                {!!props.edit && editing ? (
                    <ImagesUpload onChange={props.onChange} images={!!props.value && props.value.length ? props.value : []}/>
                ) : (
                    <div className={classes.viewImagesContainer} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <ViewImages images={!!props.value && props.value.length ? props.value.map(i => [i, () => null]) : []}/>
                        { !!hover && !!props.edit && <div onClick={() => setEditing(true)} className={classes.addImages} /> }
                    </div>
                )}
            </div>

        </FormField>

    )
}
