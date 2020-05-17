import clsx from 'clsx'
import React, {useEffect, useState, useRef} from 'react'
import update from 'immutability-helper';

import ClearIcon from '@material-ui/icons/Clear';

import {withStyles, makeStyles} from '@material-ui/core/styles';
import {styles} from './custom_select.styles'
let useStyles = makeStyles(styles)

export const CustomSelect = (props) => {
    let {multiple, no_filter} = props
    const input_ref = useRef(null);
    let [selected_elements, setSelectedElements] = useState(props.value ? props.value : multiple ? [] : null)
    let [mouse_down_element, setMouseDownElement] = useState(null)
    let [focus, setFocus] = useState(!!props.focus || false)
    let [filter_text, setFilterText] = useState(!multiple && !!props.value && !no_filter ? props.value : '')
    let classes = useStyles()

    useEffect(() => {
        if (!!props.focus) {
            input_ref.current.focus()
        }
    },[])

    useEffect(() => {
        setSelectedElements(props.value ? props.value : multiple ? [] : null)
    },[props.value])


    function selectElement(el) {
        let new_selected_elements = !!multiple ? update(selected_elements, {
            $push: [el]
        }) : el
        props.onChange({target:{value:new_selected_elements, name:props.name}})
        setSelectedElements(new_selected_elements)
        if (!multiple && !no_filter) {
            setFilterText(el)
        }
    }
    function deselectElement(index) {
        let new_selected_elements = update(selected_elements, {
            $splice: [[index, 1]]
        })
        props.onChange({target:{value:new_selected_elements, name:props.name}})
        setSelectedElements(new_selected_elements)
    }
    function endSelect(el) {
        if (el == mouse_down_element) {
            if (el == 'action') {
                props.listAction(filter_text)
            } else {
                selectElement(el)
                setFilterText('')
                if (!multiple) {
                    setFocus(false)
                }
            }
        }
        setMouseDownElement(null)
    }
    function beginSelect(e, el) {
        e.preventDefault()
        e.stopPropagation()
        setMouseDownElement(el)
    }
    function handleBlur(e) {
        e.preventDefault()
        e.stopPropagation()
        if (!mouse_down_element) {
            setFocus(false)
        }
        if (!!props.onBlur) {
            props.onBlur()
        }
    }

    function filteredElements() {
        return props.elements.filter(el => {
            if (!!multiple) {
                return !selected_elements.includes(el) && el.includes(filter_text)
            }
            return el.includes(filter_text)
        })

    }
    let input_style = {
        width: focus || !selected_elements ? '100%' : '0px'
    }
    let no_input = {
        width: '0',
        height: '0'
    }
    let span_style = focus || !selected_elements ? {
        display: 'none'
    } : {}

    let dropdown_style = !!props.left ? {left: 0} : !!props.right ? {right: 0} : {left: 0, right: 0}

    return (
        <div className={classes.customSelectContainer}>
            <div className={clsx(classes.customSelect, classes.customSelectHover)} onClick={() => {input_ref.current.focus(); setFocus(true)}}>
            {!!multiple && selected_elements.map((element, index) => {
                return (
                    <div className={classes.customSelectChip}>
                        <div className={classes.customSelectChipText}><span>{element}</span></div>
                        <div onClick={() => deselectElement(index)} className={classes.deleteChip}><ClearIcon className={classes.deleteIcon} /></div>
                    </div>
                )
            })}
            {
                !!no_filter && (
                    <>
                        <div className={classes.customSelectTextContainer}>
                            {!selected_elements || multiple ? <span>{props.placeholder}</span> : <span>{selected_elements}</span>}
                        </div>
                        <input ref={input_ref} style={no_input} autoComplete="off" value={filter_text} onChange={(e) => setFilterText(e.target.value)} placeholder={props.placeholder} className={classes.customSelectText} onFocus={() => setFocus(true)}  onBlur={handleBlur}/>
                    </>
                )
            }
            { (!!multiple && !no_filter) && (
                <div className={classes.customSelectTextContainer}><input ref={input_ref} autocomplete="off" value={filter_text} onChange={(e) => setFilterText(e.target.value)} placeholder={props.placeholder} className={classes.customSelectText} onFocus={() => setFocus(true)}  onBlur={handleBlur}/></div>
            )}
            { (!multiple && !no_filter) && (
                <div className={classes.customSelectTextContainer}>
                    <input ref={input_ref} style={input_style} autoComplete="off" value={filter_text} onChange={(e) => setFilterText(e.target.value)} placeholder={props.placeholder} className={classes.customSelectText} onFocus={() => setFocus(true)}  onBlur={handleBlur}/>
                    <span style={span_style}>{selected_elements}</span>
                </div>
            )}
            </div>
            {focus && (
                <div style={dropdown_style} className={classes.customSelectDropdown}>
                    <ul className={classes.customSelectList}>
                    {filteredElements().map(el => {
                        return (
                            <li className={classes.customSelectListItem} key={el} onMouseDown={(e) => beginSelect(e, el)} onMouseUp={() => endSelect(el)}>
                                {el}
                            </li>
                        )
                    })}
                    { !!props.listAction && (
                        <li className={classes.customSelectListItem} key="list-action" onMouseDown={(e) => beginSelect(e, "action")} onMouseUp={() => endSelect("action")}>
                            {props.listActionText}
                        </li>
                    )}
                    </ul>
                </div>
            )}
        </div>
    )
}
