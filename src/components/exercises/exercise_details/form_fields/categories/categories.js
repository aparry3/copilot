import React, {useState} from 'react'


import { CustomSelect, FormField, MultiSelectView } from '../../../../utils';


export const Categories = props => {
    let [editing, setEditing] = useState(false)
    console.log(props.value)
    function handleChange(e) {
        setEditing(false)
        const value = e.target.value
        props.onChange(props.categories.find(c => c.value == value).id)
    }
    return (
        <FormField
            title='categories'
            condition={!!props.value.length || editing}
            onClick={!!props.edit ? () => setEditing(true) : null}
            value={props.value}
            edit={props.edit}
            >
                <CustomSelect
                    placeholder="Category..."
                    name="category"
                    onChange={handleChange}
                    value={props.categories[props.value].value}
                    elements={props.categories.map(c => c.value)}/>
        </FormField>
    )
}
// <MultiSelectView values={props.value} />
