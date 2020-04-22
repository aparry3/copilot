import clsx from 'clsx'
import {copyState} from '../../../../../../reducers/utils'
import React, {useEffect, useState} from  'react'
import update from 'immutability-helper'

import {details as render_details, FormField, InputTitle} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './option.styles'
const useStyles = makeStyles(styles)

export const Option = props => {
    let classes = useStyles()
    console.log(props)
    return (
        <div className={classes.option}>
            <div className={classes.optionTitle}>
                {props.children}
            </div>
            <div className={classes.optionValue}>
                <InputTitle value={props.value} focus autocomplete="off" name={props.name} onSave={props.onChange}/>
            </div>
        </div>
    )
}
