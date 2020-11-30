import React, {useState, useEffect, useRef} from "react";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {styles} from './muscle_groups.styles'


let useMGStyles = makeStyles(styles)

export function MuscleGroups(props) {
    let classes = useMGStyles()
    let {muscle_group} = props
    
    return (
        <div className={classes.muscleGroups}>
            {props.muscle_groups.map(m => {
                let mg_style = {
                    background: !!props.muscle_groups_map[m].color ? props.muscle_groups_map[m].color : 'yellow'
                }
                return (
                    <div className={classes.muscleGroupContainer}>
                        <div style={mg_style} className={classes.muscleGroup}><span>{props.muscle_groups_map[m].value}</span></div>
                    </div>
                )
            })}
        </div>
    )
}
