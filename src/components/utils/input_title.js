import React, {useState, useEffect, useRef} from 'react'

import {makeStyles} from '@material-ui/core/styles';

export const line_height = 24

const styles = theme => ({
    inputTitle: {
        lineHeight: `${line_height}px`,
        flexGrow: 1,
        resize: 'none',
        padding: '10px'
    },
    inputTitleText: {
        flexGrow: 1,
        padding: '10px'
    },
    inputTitleContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
})
const useStyles = makeStyles(styles)

export function InputTitle(props) {
    let classes = useStyles()
    let [value, setValue] = useState(!!props.value ? props.value : props.default)
    let [is_focused, setIsFocused] = useState(!!props.focus)

    let ref = useRef(null)

    useEffect(() => {
        if (is_focused) {
            ref.current.focus()
        }
    }, [is_focused])

    useEffect(() => {
        setValue(props.value)
    }, [props.value])


    function handleChange(e) {
        setValue(e.target.value)
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
        <div className={classes.inputTitleContainer}>
        {!!is_focused ? (
            <>
                <input className={classes.inputTitleText} ref={ref} placeholder={!!props.placeholder ? props.placeholder : ''} autocomplete={props.autocomplete || 'on'} value={value} onBlur={handleBlur} onChange={handleChange} name='name' />
                { !!props.label && (<label>{props.label}</label>)}
            </>
            ) : (
            <div className={classes.inputTitle} onClick={handleFocus}>
                <span>
                    {!!value ? value : props.default}
                </span>
            </div>
        )}
        </div>
    )
}
