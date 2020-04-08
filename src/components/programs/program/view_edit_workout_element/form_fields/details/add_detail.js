import clsx from 'clsx'
import React, {useState} from 'react'

import AddIcon from '@material-ui/icons/Add';

import {details} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';

const styles = theme => ({
    option: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main
        }
    },
    addDetailPopup: {
        position: 'absolute',
        left: 0,
        top: '20px',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.light,
        padding: '10px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`
    },
    popupClose: {
        position: 'fixed',
        top:0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0
    }
})

const useStyles = makeStyles(styles)


export const AddDetail = props => {
    let classes = useStyles()
    let [active, setActive] = useState(false)
    function handleSelect(e, detail) {
        e.stopPropagation()
        props.onSelect(detail)
    }
    return (
        <>
            <div className={classes.popupClose} onClick={props.onClose}/>
            <div className={classes.addDetailPopup}>
            {props.options.map(d => {
                return (
                    <div onClick={(e) => handleSelect(e, d)} className={classes.option}>
                        {details[d].title()}
                    </div>
                )
            })}
            </div>
        </>
    )
}
