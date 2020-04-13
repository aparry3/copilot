import clsx from 'clsx'
import React, {useState} from 'react'

import AddIcon from '@material-ui/icons/Add';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './add_block.styles'
const useStyles = makeStyles(styles)


export const AddBlock = (props) => {
    let classes = useStyles()
    let [block, setBlock] = useState(props.block)
    console.log(props)
    return (
        <div className={classes.blockContainer}>
            <div onClick={props.addBlock} className={clsx(classes.block, classes.addBlock)}>
                <span className={classes.addBlockText}><AddIcon /> Add Block</span>
            </div>
        </div>
    )
}
