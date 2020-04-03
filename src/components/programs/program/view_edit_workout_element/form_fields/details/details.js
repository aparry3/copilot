import clsx from 'clsx'
import {copyState} from '../../../../../../reducers/utils'
import React, {useEffect, useState} from  'react'
import update from 'immutability-helper'

import {AddDetail} from './add_detail'
import {InputTitle} from '../../../../../utils'

import {all_details} from './all_details'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './details.styles'
const useStyles = makeStyles(styles)

export const Details = props => {
    let classes = useStyles()
    let [details, setDetails] = useState(props.value)
    let _remaining_details = !!details ? Object.keys(all_details).filter(d => Object.keys(details).indexOf(d) == -1) : Object.keys(all_details)
    let [remaining_details, setRemainingDetails] = useState(_remaining_details)
    let [add_detail, setAddDetail] = useState(false)
    let [hover, setHover] = useState(false)


    function remainingDetails() {
        return Object.keys(all_details).filter(d => Object.keys(details).indexOf(d) == -1)
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
    }

    function handleAdd() {
        console.log("handle add")
        setAddDetail(true)
    }

    function handleClose(e) {
        e.stopPropagation()
        setAddDetail(false)
    }
    console.log(add_detail)
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
                                        {all_details[d].title()}
                                    </div>
                                    <div className={classes.detailRowInput}>
                                        <InputTitle value={details[d]} focus name={d} onSave={(value) => updateDetail(d, value)}/>
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
