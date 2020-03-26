import React, {useState, useEffect, useRef} from "react";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {MUSCLE_GROUPS} from '../../constants/exercises'


let muscle_group_styles = (theme) => ({
    muscleGroups: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    muscleGroupContainer: {
        padding: '3px'
    },
    muscleGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        width: '65px',
        fontSize: '13px',
        fontWeight: 200
    }
})
let useMGStyles = makeStyles(muscle_group_styles)

export function MuscleGroups(props) {
    let classes = useMGStyles()
    return (
        <div className={classes.muscleGroups}>
            {props.muscle_groups.map(m => {
                let mg_style = {
                    background: MUSCLE_GROUPS[m].color
                }
                return (
                    <div className={classes.muscleGroupContainer}>
                        <div style={mg_style} className={classes.muscleGroup}><span>{m}</span></div>
                    </div>
                )
            })}
        </div>
    )
}
