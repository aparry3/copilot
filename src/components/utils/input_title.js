import React, {useState, useEffect, useRef} from 'react'

export function InputTitle(props) {
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
        <div>
        {!!is_focused ? (
            <>
                <input ref={ref} placeholder={!!props.placeholder ? props.placeholder : ''} autocomplete={props.autocomplete || 'on'} value={value} onBlur={handleBlur} onChange={handleChange} name='name' />
                { !!props.label && (<label>{props.label}</label>)}
            </>
            ) : (
            <div onClick={handleFocus}>
                <span>
                    {!!value ? value : props.default}
                </span>
            </div>
        )}
        </div>
    )
}
