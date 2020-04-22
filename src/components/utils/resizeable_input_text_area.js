import React, {useState} from 'react'

import {InputTextArea, line_height} from './input_text_area'

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(styles)


const styles = theme => ({
})

export const ResizeableInputTextArea = props => {
    let {rows, ...pass_through_props} = props
    let [_rows, setRows] = useState(!!rows ? rows : 3)

    function handleChange(e) {
        let current_rows = ~~(e.target.scrollHeight / line_height)
        e.target.rows = current_rows
        setRows(current_rows)
    }

    return (
        <InputTextArea focus={!!props.focus} rows={_rows} onChange={handleChange} {...props}/>
    )
}
