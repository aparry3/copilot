import React, {useState} from 'react'

import ViewImages from './view_images'
import ImagesUpload from './images_upload'
import { FormField } from '../../../../utils';


export const Images = (props) => {
    let [editing, setEditing] = useState(false)

    return (
        <FormField
            title='images'
            condition={!!props.value.length || editing}
            onClick={!!props.edit ? () => setEditing(true) : null}
            edit={props.edit}
            value={props.value}
            >
            {!!props.edit ? (
                <ImagesUpload />
            ) : (
                <ViewImages />
            )}
        </FormField>

    )
}
