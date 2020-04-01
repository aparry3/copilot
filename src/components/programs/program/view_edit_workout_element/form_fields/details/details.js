import clsx from 'clsx'
import React, {useEffect, useState} from  'react'
import update from 'immutability-helper'

import {AddDetail} from './add_detail'

import {all_details} from './all_details'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './details.styles'
const useStyles = makeStyles(styles)

export const Details = props => {
    let classes = useStyles()
    let [details, setDetails] = useState(props.details)
    let _remaining_details = !!details ? Object.keys(all_details).filter(d => Object.keys(details).indexOf(d) == -1) : Object.keys(all_details)
    let [remaining_details, setRemainingDetails] = useState(_remaining_details)
    let [add_detail, setAddDetail] = useState(false)
    let [hover, setHover] = useState(false)

    useEffect(() => {
        setAddDetail(false)
        if (!!details) {
            let new_remaining_details = Object.keys(all_details).filter(d => Object.keys(details).indexOf(d) == -1)
            setRemainingDetails(new_remaining_details)
        }
    }, [details])

    function addDetails() {
        setDetails({})
    }

    function addDetail(detail) {
        setDetails(update(details, {
            [detail]: {$set: null}
        }))
    }
    console.log(hover)
    console.log(add_detail)
    console.log(remaining_details)
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
                                    </div>
                                </div>
                            ))}
                            { (Object.keys(details).length == 0 || add_detail || remaining_details.length > 0 && hover) && (
                                <div className={classes.addDetail} onClick={() => setAddDetail(true)}>
                                    <div><span>Add detail...</span></div>
                                    { !!add_detail && (<AddDetail options={remaining_details} onSelect={addDetail}/>)}
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
