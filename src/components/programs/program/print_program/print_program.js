import React from 'react'

import {titleCase} from '../../../utils'
import {schemes} from '../../../../constants/workout_elements';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './print_program.styles'
const useStyles = makeStyles(styles)

function renderDetails(details) {
    let classes = useStyles()
    let _details = []
    if (!!details.sets) {
        if (!!details.repetitions) {
            if (!!details.repetitions.split(' ').length > 1) {
                _details.push(`${details.repetitions}`)
            } else {
                _details.push(`${details.sets}x${details.repetitions}`)
            }
        } else if (!!details.duration) {
            _details.push(`${details.sets}x${details.duration}`)
        } else {
            _details.push(`Sets: ${details.sets}`)
        }
    } else if (!!details.repetitions) {
        if (!!details.repetitions.split(' ').length > 1) {
            _details.push(`${details.repetitions}`)
        } else {
            _details.push(`Reps: ${details.repetitions}`)
        }
    } else if (!!details.duration) {
        _details.push(`Time: ${details.repetitions}`)
    }
    Object.keys(details).filter(d => ['sets', 'repetitions', 'duration'].indexOf(d) == -1).forEach(d => {
        if (!!details[d]) {
            _details.push(`${titleCase(d)}: ${details[d]}`)
        }
    })
    return (
        <>
        {_details.map(d => (<div className={classes.detail}><span>{d}</span></div>))}
        </>
    )
}

function renderHeader(scheme, details) {
    let classes = useStyles()
    let title = !!scheme && scheme.length ? scheme.join(', ') : 'SUPERSET'
    let detail = []
    scheme.forEach(s => {

        detail = [...detail, ...schemes[s].options.map(o => {
            if (!!details[o.detail]) {
                return `${o.title}: ${details[o.detail]}`
            }
        })]
    })
    return (
        <div className={classes.supersetHeader}>
            <div className={classes.supersetHeaderTitle}><span>{title}</span></div>
            <div className={classes.supersetHeaderDetails}>{detail.map(d => (<span className={classes.supersetHeaderDetail}>{d}</span>))}</div>
        </div>
    )

}


const Exercise = props => {
    let classes = useStyles()


    return (
        <div className={classes.exercise}>
            <div className={classes.exerciseName}>
                <span>-</span>
                <div className={classes.exerciseNameText}>
                    <span className={classes.name}>
                    {props.exercise.exercise.name}
                    </span>
                    {!!props.exercise.notes && (
                    <div className={classes.exerciseNotes}>
                        <span>Notes:</span>
                        <span className={classes.exerciseNameText}>
                        {props.exercise.notes}
                        </span>
                    </div>
                    )}
                </div>
            </div>
            <div className={classes.exerciseDetails}>
                {renderDetails(props.exercise.details)}
            </div>
        </div>
    )
}

const Superset = props => {
    let classes = useStyles()

    return (
        <div className={classes.superset}>
            {renderHeader(props.superset.scheme, props.superset.details)}
            <div className={classes.supersetExercises}>
                {props.superset.exercises.map(e => (
                    <Exercise exercise={e} />
                ))}
            </div>
            {!!props.superset.notes && (
                <div className={classes.supersetNotes}>
                    <div className={classes.supersetNotesTitle}><span>Notes:</span></div>
                    <div className={classes.supersetNotesValue}>{props.superset.notes}</div>
                </div>
            )}
            <div className={classes.supersetDetails}>
                {renderDetails(props.superset.details)}
            </div>
        </div>
    )
}


export const PrintProgram = props => {
    let classes = useStyles()
    return (
        <div id="print_program" className={classes.program}>
            {props.program.weeks.map((w, i) => (
                <div className={classes.week}>
                    <div className={classes.weekHeader}>
                        <span>{`${props.program.name}: Week ${i + 1}`}</span>
                    </div>
                    <div className={classes.weekContent}>
                        {w.days.map(d => ((
                            <div className={classes.day}>
                                <div className={classes.dayHeader}>
                                    <div className={classes.dayTitle}><span>{d.name}</span></div>
                                </div>
                                <div className={classes.dayContent}>
                                    {
                                        d.workout_blocks.map(b => (
                                            <div className={classes.block}>
                                                {
                                                    b.workout_elements.map(we => (
                                                        <div className={classes.workoutElement}>
                                                            {we.type == 'EXERCISE' ? (
                                                                <Exercise exercise={we}/>
                                                            ) : (
                                                                <Superset superset={we} />
                                                            )}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            ))}
        </div>
    )
}
