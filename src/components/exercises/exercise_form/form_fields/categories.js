import React, {useState} from 'react'

import { CATEGORIES } from '../../../../constants/exercises';

import { CustomSelect, FormField } from '../../../utils';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const Categories = props => {
    let classes = useStyles()
    let [editing, setEditing] = useState(false)

    function handleChange(e) {
        setEditing(false)
        props.onChange(e.target.value)
    }
    return (
        <FormField
            title='categories'
            condition={!!props.value.length || editing}
            onClick={() => setEditing(true)}
            >
                <CustomSelect multiple placeholder="Categories..." name="categories" onChange={handleChange} value={props.value} elements={CATEGORIES}/>
        </FormField>
    )
}
