import clsx from 'clsx'
import {copyState} from '../../../../../../reducers/utils'
import React, {useEffect, useState} from  'react'
import update from 'immutability-helper'

import {AddDetail} from './add_detail'
import {details as render_details, InputTitle} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './details.styles'
const useStyles = makeStyles(styles)

export const Details = props => {
    let classes = useStyles()
    let [details, setDetails] = useState(props.value)
    let _remaining_details = !!details ? Object.keys(render_details).filter(d => Object.keys(details).indexOf(d) == -1) : Object.keys(render_details)
    let [remaining_details, setRemainingDetails] = useState(_remaining_details)
    let [add_detail, setAddDetail] = useState(false)
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
        props.onChange(new_details)
    }

    function handleAdd() {
        setAddDetail(true)
    }

    function handleClose(e) {
        e.stopPropagation()
        setAddDetail(false)
    }

    return (
        <div className={classes.formFieldContainer}>
            { !!details ? (
                <>
                    <div className={classes.formFieldHeader}>
                        <span>DETAILS</span>
                    </div>
                    <div className={classes.formFieldContent} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className={classes.details}>
                            { Object.keys(details).map(d => (
                                <div className={classes.detailRow}>
                                    <div className={classes.detailRowTitle}>
                                        {render_details[d].title()}
                                    </div>
                                    <div className={classes.detailRowInput}>
                                        <InputTitle value={details[d]} focus autocomplete="off" name={d} onSave={(value) => updateDetail(d, value)}/>
                                    </div>
                                </div>
                            ))}
                            { (Object.keys(details).length == 0 || add_detail || remainingDetails().length > 0 && hover) && (
                                <div className={classes.addDetail} onClick={handleAdd}>
                                    <div className={classes.addDetailText}><span>Add detail...</span></div>
                                    { !!add_detail && (<AddDetail options={remainingDetails()} onSelect={addDetail} onClose={handleClose}/>)}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div onClick={() => addDetails()} className={clsx(classes.formFieldHeader, classes.emptyForm)}>
                    <span>Add details...</span>
                </div>
            )}
        </div>
    )
}
