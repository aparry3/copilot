import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'

import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import {Divider} from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Week from '../week'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './overview.styles'
const useStyles = makeStyles(styles)


export const Overview = (props) => {
    let classes = useStyles()

    function toggleCollapseWeek(index) {
        setWeeks(update(weeks, {
            [index]: {collapsed: {$set: !weeks[index].collapsed}}
        }))
    }
    console.log(props)
    return (
        <div className={classes.overview}>
            {props.program.weeks.map((week, index) => {
                let week_container_classes = [classes.weekContainer]
                if (!week.collapsed) {
                    week_container_classes.push(classes.expanded)
                }
                return (
                    <div className={clsx(week_container_classes)} key={`${week._id}`}>
                        <div className={classes.weekHeader}>
                            <div className={classes.weekTitle} onClick={() => props.toggleCollapseWeek(week._id)}>
                                <div className={classes.collapseContainer} >{week.collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}</div>
                                <span className={classes.weekNumber}>{`Week ${index + 1}`}</span>
                            </div>
                            <div className={classes.deleteWeek} onClick={() => props.deleteWeek(week._id)}>
                                <ClearIcon className={classes.deleteIcon} />
                            </div>
                        </div>
                        <Divider variant="middle"/>
                        { !week.collapsed && (<Week week={week} index={index} />) }
                    </div>
                )
            })}
            <div className={classes.addWeekSection}>
                <div className={classes.addWeek} onClick={() => props.addWeek(props.program._id)}><span className={classes.addWeekText}><AddIcon /> Add Week</span></div>
            </div>
        </div>
    )
}
