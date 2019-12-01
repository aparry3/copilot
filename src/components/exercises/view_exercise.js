import ClearIcon from '@material-ui/icons/Clear';
import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {MuscleGroup} from '../util'
let styles = theme => ({
    viewExerciseContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
    },
    closeHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    closeIconContainer: {
        cursor: 'pointer',
        borderRadius: '5px',
        '&:hover': {
            background: theme.palette.background.mediumDark
        }
    },
    viewExerciseSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    viewExercsieSectionHeader: {
        width: '100%',
        height: '20px',
        display: 'flex',
        fontSize: '12px',
        fontWeight: 200,
        alignItems: 'center'
    },
    viewExerciseSectionContent: {
        width: '100%',
        padding: '10px',
        display: 'flex',
        alignItems: 'flex-start'
    }
})

let useStyles = makeStyles(styles)


function ViewExerciseSection(props) {
    let classes = useStyles()
    return (
        <div className={classes.viewExerciseSection}>
            <div className={classes.viewExercsieSectionHeader}>
                <span>{props.name}</span>
            </div>
            <div className={classes.viewExerciseSectionContent}>
                {props.children}
            </div>
        </div>
    )
}

export const ViewExercise = (props) => {
    let classes = useStyles()
    return (
        <div className={classes.viewExerciseContainer}>
            <div className={classes.closeHeader}>
                <div className={classes.closeIconContainer} onClick={props.onCancel}><ClearIcon /></div>
            </div>
            <div className={classes.exerciseContent}>
                <ViewExerciseSection name="Name">
                    <div className={classes.exerciseName}>
                        {props.exercise.name}
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection  name="Description">
                    <div className={classes.exerciseDescription}>
                        {props.exercise.description}
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection name="Muscle Groups">
                    <div className={classes.exerciseRowMuscleGroups}>
                        <MuscleGroup muscle_groups={[...new Set(props.exercise.primary_muscles.map(m => m.muscle_group))]} />
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection  name="Primary Muscles">
                    <div className={classes.exercisePrimaryMuscles}>
                    {props.exercise.primary_muscles.map(m => m.name)}
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection name="Secondary Muscles">
                    <div className={classes.exerciseSecondaryMuscles}>
                    {props.exercise.secondary_muscles.map(m => m.name)}
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection name="Categories">
                    <div className={classes.exerciseCategories}>
                        {props.exercise.categories}
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection name="Images">
                    <div className={classes.exerciseImages}>
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection name="Videos">
                    <div className={classes.exerciseVideo}>
                    </div>
                </ViewExerciseSection>
            </div>
        </div>
    )

}
