import clsx from 'clsx'
import React, {useState} from 'react'

import AddIcon from '@material-ui/icons/Add';

import {all_details} from './all_details'

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
    }
})
const useStyles = makeStyles(styles)


export const AddDetail = props => {
    let classes = useStyles()
    let [active, setActive] = useState(false)
    console.log(props)
    return (
        <div className={classes.addDetailPopup}>
        {props.options.map(d => {
            return (
                <div onClick={() => props.onSelect(d)} className={classes.option}>
                    {all_details[d].title()}
                </div>
            )
        })}
        </div>
    )
}
