import clsx from 'clsx'
import React from 'react'

import { CATEGORIES } from '../../../../constants/exercises';

import { CustomSelect } from '../../../utils';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const Categories = props => {
    let classes = useStyles()
    return (
        <div className={classes.formSectionContainer}>
            <div className={clsx(classes.formSection)}>
                <div className={classes.formSectionHeader}><span>Categories</span></div>
                <CustomSelect multiple placeholder="Categories..." name="categories" onChange={props.onChange} value={props.value} elements={CATEGORIES}/>
            </div>
        </div>
    )
}
