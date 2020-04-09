import React, {useEffect, useRef, useState} from 'react'

import {makeStyles} from '@material-ui/core/styles';

export const line_height = 24

const styles = theme => ({
    inputTextArea: {
        lineHeight: `${line_height}px`,
        flexGrow: 1,
        resize: 'none',
        padding: '10px'
    },
    inputTextAreaText: {
        flexGrow: 1,
        padding: '10px'
    },
    inputTextAreaContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
})
const useStyles = makeStyles(styles)


export const InputTextArea = props => {
    let [value, setValue] = useState(!!props.value ? props.value : props.default)
    let [is_focused, setIsFocused] = useState(!!props.focus)
    let [rows, setRows] = useState(!!props.rows ? props.rows : 1)
    let ref = useRef(null)
    let classes = useStyles()
    useEffect(() => {
        if (is_focused) {
            ref.current.focus()
        }
    }, [is_focused])

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    useEffect(() => {
        setRows(props.rows)
    }, [props.rows])

    function handleChange(e) {
        setValue(e.target.value)
        if (!!props.onChange) {
            props.onChange(e)
        }
    }

    function handleFocus() {
        setIsFocused(true)

    }

    function handleBlur() {
        setIsFocused(false)
        if (!value && !!props.default) {
            setValue(props.default)
            props.onSave(props.default)
        } else {
            props.onSave(value)
        }
    }

    return (
        <div className={classes.inputTextAreaContainer}>
        {!!is_focused ? (
            <>
                <textarea ref={ref} rows={rows} resize={false} className={classes.inputTextArea} value={value} onBlur={handleBlur} onChange={handleChange} name={props.name} />
                { !!props.label && (<label>{props.label}</label>)}
            </>
            ) : (
            <div className={classes.inputTextAreaText} onClick={handleFocus}>
                <span>
                    {!!value ? value : props.default}
                </span>
            </div>
        )}
        </div>
    )
}
