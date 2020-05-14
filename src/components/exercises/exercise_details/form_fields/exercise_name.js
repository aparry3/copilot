import React, {useState} from 'react'

import {FormField, InputTitle} from '../../../utils'


export const ExerciseName = props => {

    function handleSave(value) {
        props.onChange(value)
    }

    return (
        <FormField
            title='name'
            >
            <InputTitle onSave={handleSave} value={props.value} />
        </FormField>
    )
}
