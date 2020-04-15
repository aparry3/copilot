import clsx from 'clsx'
import React, {useState} from 'react'

import { allMuscles } from '../../../../constants/exercises';
import { titleCase } from '../../../utils';

import { CustomSelect } from '../../../utils';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const Muscles = props => {
    let classes = useStyles()
    let all_muscles = allMuscles()

    function transform(value) {
        return value.map(y => all_muscles.find(m => m.name == y))
    }

    function handleChange(e) {
        props.onChange({
            target: {
                name: e.target.name,
                value: transform(e.target.value)
            }
        })
    }

    return (
        <div className={classes.formSectionContainer}>
            <div className={clsx(classes.formSection)}>
                <div className={classes.formSectionHeader}><span>{titleCase(props.title)} muscles</span></div>
                <CustomSelect multiple placeholder={`Add ${props.title} muscles...`} name={props.name} onChange={handleChange} value={props.value.map(m => m.name)} elements={all_muscles.map(m => m.name)} />
            </div>
        </div>
    )
}
