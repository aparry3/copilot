import React, {useEffect, useState, useRef} from 'react'
import {withStyles, makeStyles} from '@material-ui/core/styles';
import update from 'immutability-helper';

import ClearIcon from '@material-ui/icons/Clear';
const height = 50

const styles = theme => ({
    customSelectContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: theme.palette.background.light,
        borderRadius: '5px',
        height: `${height}px`,
        position: 'relative'
    },
    customSelect: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'auto',
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
        '&:hover': {
            background: theme.palette.background.main
        }
    },
    customSelectText: {
        background: 'transparent',
        color: theme.text.primary,
        outline: 'none',
        border: 'none',
        width: '100%',
    },
    customSelectDropdown: {
        position: 'absolute',
        background: theme.palette.background.light,
        zIndex: 150,
        boxShadow: `${theme.palette.background.dark} 0px 2px 6px -5px`,
        maxHeight: '200px',
        overflow: 'auto',
        padding: '5px',
        top: `${height}px`,
    },
    customSelectChip: {
        height: '30px',
        width: '100px',
        border: `1px solid ${theme.accents.primary.main}`,
        borderRadius: '15px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.background.light
    },
    customSelectList: {
        listStyleType: 'none',
        margin: 0,
        width: '100%',
        height: '100%',
        padding: 0,
    },
    customSelectTextContainer: {
        flexGrow: 1,
        marginLeft: '5px',
    },
    customSelectListItem: {
        padding: '10px',
        borderBottom: `1px solid ${theme.palette.background.light}`,
        background: 'white',
        color: theme.text.dark,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main,
            color: theme.text.primary
        }
    },
    deleteChip: {
        cursor: 'pointer',
        height: '30px',
        minWidth: '30px',
        width: '30px',
        borderRadius: '15px',
        background: theme.accents.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center'
    },
    customSelectChipText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '12px',
        fontWeight: 100,
        padding: '5px 5px 5px 10px',
        whiteSpace: 'nowrap',
        color: theme.text.primary
    },
    deleteIcon: {
        color: theme.text.dark,
        height: '20px',
        width: '20px'
    }
})
let useStyles = makeStyles(styles)

export const CustomSelect = (props) => {
    let {multiple, no_filter} = props
    const input_ref = useRef(null);
    let [selected_elements, setSelectedElements] = useState(props.value ? props.value : multiple ? [] : null)
    let [mouse_down_element, setMouseDownElement] = useState(null)
    let [focus, setFocus] = useState(!!props.focus || false)
    let [filter_text, setFilterText] = useState(!multiple && !!props.value && !no_filter ? props.value : '')
    let classes = useStyles()

    console.log(selected_elements)
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
            <div className={classes.customSelect} onClick={() => {input_ref.current.focus(); setFocus(true)}}>
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
