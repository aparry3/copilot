import React from 'react'

// import {makeStyles} from '@material-ui/core/styles';
// import {styles} from './block.styles'
// const useStyles = makeStyles(styles)

export const PrintProgram = props => {
    // let classes = useStyles()
    return (
        <div >
            {props.program.weeks.map((w, i) => (
                <div>
                    <div>
                        <span>{`${props.program.name}: ${i + 1}`}</span>
                    </div>
                    <div>
                        {w.days.map(d => ((
                            <div>
                                <div>
                                    <span>{d.name}</span>
                                </div>
                                <div>
                                    {
                                        d.workout_blocks.map(b => (
                                            <div>
                                                {
                                                    b.workout_elements.map(we => (
                                                        <div>
                                                            {we.type == 'EXERCISE' ? (
                                                                <div>
                                                                    {we.exercise.name}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    {we.exercises.map(e => (
                                                                        <div>
                                                                            {e.exercise.name}
                                                                        </div>
                                                                    ))}
                                                                </div>
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
