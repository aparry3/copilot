import clsx from 'clsx'
import {copyState} from '../../../../../../reducers/utils'
import React, {useEffect, useState} from  'react'
import update from 'immutability-helper'

import {details as render_details} from '../../../../../utils'

import {AddDetail} from './add_detail'
import {FormField, InputTitle} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './details.styles'
const useStyles = makeStyles(styles)

export const Details = props => {
    let classes = useStyles()
    let [details, setDetails] = useState(props.value)
    let _remaining_details = !!details ? Object.keys(render_details).filter(d => Object.keys(details).indexOf(d) == -1) : Object.keys(render_details)
    let [remaining_details, setRemainingDetails] = useState(_remaining_details)
    let [add_detail, setAddDetail] = useState(false)
    let [current_detail, setCurrentDetail] = useState('')
    let [hover, setHover] = useState(false)

    useEffect(() => {
        setDetails(props.value)
    }, [props.value])


    function remainingDetails() {
        return Object.keys(render_details).filter(d => Object.keys(details).indexOf(d) == -1)
    }

    function addDetails() {
        setDetails({})
    }

    function addDetail(detail) {
        setAddDetail(false)
        setCurrentDetail(detail)
        setDetails(update(details, {
            [detail]: {$set: null}
        }))
    }

    function updateDetail(detail, value) {
        let new_details = copyState(details)
        if (!value) {
            delete new_details[detail]
        } else {
            new_details[detail] = value
        }
        setDetails(new_details)
        setCurrentDetail('')
        props.onChange(new_details)
    }

    function handleAdd() {
        setAddDetail(true)
    }

    function handleClose(e) {
        e.stopPropagation()
        setAddDetail(false)
    }

    function renderItem(detail) {
        return render_details[detail].title()
    }

    return (
        <FormField
            title='details'
            condition={Object.keys(details).length > 0 || add_detail}
            onClick={handleAdd}
            >
            <div className={classes.details} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                { Object.keys(details).map(d => (
                    <div className={classes.detailRow}>
                        <div className={classes.detailRowTitle}>
                            {render_details[d].title()}
                        </div>
                        <div className={classes.detailRowInput}>
                            <InputTitle value={details[d]} focus={current_detail == d} autocomplete="off" name={d} onSave={(value) => updateDetail(d, value)}/>
                        </div>
                    </div>
                ))}
                { (Object.keys(details).length == 0 || add_detail || remainingDetails().length > 0 && hover) && (
                    <div className={classes.addDetail} onClick={handleAdd}>
                        <div className={classes.addDetailText}><span>Add detail...</span></div>
                        { !!add_detail && (<AddDetail renderItem={renderItem} options={remainingDetails()} onSelect={addDetail} onClose={handleClose}/>)}
                    </div>
                )}
            </div>
        </FormField>
    )
}
