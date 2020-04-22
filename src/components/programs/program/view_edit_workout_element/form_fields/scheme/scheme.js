import clsx from 'clsx'
import {copyState} from '../../../../../../reducers/utils'
import React, {useEffect, useState} from  'react'
import update from 'immutability-helper'

import {details} from '../../../../../utils'

import {AddDetail} from '../details/add_detail'
import {Option} from './option'
import {DetailTitle} from '../../../../../utils'
import {schemes as all_schemes} from '../../../../../../constants/workout_elements'

import {FormField, ResizeableInputTextArea} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './scheme.styles'
const useStyles = makeStyles(styles)

function _getSchemes(prop_schemes) {
    return prop_schemes.map(s => {
        return {
            title: all_schemes[s].title,
            editing: false,
            add_option: false,
            type : all_schemes[s].type,
            options: all_schemes[s].options.map(o => ({...o, editing: false}))
        }
    })
}

export const Scheme = props => {
    let classes = useStyles()

    let [schemes, setSchemes] = useState(_getSchemes(props.scheme))
    let [add_option, setAddOption] = useState(false)

    useEffect(() => {
        setSchemes(_getSchemes(props.scheme))
    }, [props.scheme])

    function handleChange(option, value, index, scheme) {
        console.log(value)
        if (!!value) {
            let new_details = copyState(props.details)
            let detail = option.detail
            if (!value) {
                delete new_details[detail]
            } else {
                new_details[detail] = value
            }
            props.onChange(new_details)
        }
        let _scheme = copyState(scheme)
        _scheme = toggleOption(_scheme, option.title, false)
        _scheme.editing = false,
        setSchemes(update(schemes, {
            [index]: {$set: _scheme}
        }))

    }

    function remainingOptions(scheme) {
        return scheme.options.filter(o => !props.details[o.detail])
    }

    function toggleOption(scheme, option, value) {
        scheme.options = scheme.options.map(o => {
            if (o.title == option) {
                o.editing = value
            }
            return o
        })
        return scheme
    }

    function handleAddOption(index, scheme, option) {
        let _scheme = copyState(scheme)
        _scheme = toggleOption(_scheme, option, true)
        _scheme.editing = true
        _scheme.add_option = false
        console.log(_scheme)
        setSchemes(update(schemes, {
            [index]: {$set: _scheme}
        }))
    }

    function handleClose(e, index) {
        e.stopPropagation()
        toggleAddOption(index, false)
    }

    function toggleAddOption(index, value) {
        setSchemes(update(schemes, {
            [index]: {add_option: {$set: value}}
        }))
    }

    function renderItem(scheme, option) {
        console.log(scheme)
        let _option = scheme.options.find(o => o.title == option)
        return <DetailTitle title={_option.title} icon={details[_option.detail].icon} />
    }

    console.log(props)
    console.log(schemes)
    return (
        <FormField
            condition={!!schemes && schemes.length}
            title='scheme'>
                {schemes.map((s,i) => (
                    <div className={classes.scheme}>
                        <div className={classes.schemeName}>{s.title}</div>
                        <div className={classes.schemeDetails}>
                            { !!remainingOptions(s).length && (
                                <div onClick={() => toggleAddOption(i, true)} className={classes.addSchemeDetail}>
                                    { !s.editing && (<span>Add option...</span>) }
                                    { s.add_option && (
                                        <AddDetail renderItem={(o) => renderItem(s, o)} options={remainingOptions(s).map(o => o.title)} onSelect={(o) => handleAddOption(i, s, o)} onClose={(e) => handleClose(e, i)} />
                                    )}
                                </div>
                            )}
                            {s.options.map(o => (
                                (o.editing || !!props.details[o.detail]) && (
                                    <Option
                                        name={o.detail}
                                        onChange={(value) => handleChange(o, value, i, s)}
                                        value={props.details[o.detail]}
                                        >
                                        <DetailTitle title={o.title} icon={details[o.detail].icon} />
                                    </Option>
                                )
                            ))}
                        </div>
                    </div>
                ))}

        </FormField>
    )
}
