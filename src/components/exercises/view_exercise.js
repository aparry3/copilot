import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {MuscleGroups, titleCase} from '../utils'

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
    },
    exerciseName: {
        fontSize: '20px',
        fontWeight: 600
    },
    exerciseSectionList: {
        fontWeight: 300
    },
    noSectionElementText: {
        fontSize: '14px',
        fontWeight: 200,
        opacity: 0.5
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
                {!!props.children ? props.children : (
                    <span className={classes.noSectionElementText}>Edit exercise to add {props.name.toLowerCase()}...</span>
                )}
            </div>
        </div>
    )
}

export const ViewExercise = (props) => {
    let classes = useStyles()
    return (
        <div className={classes.viewExerciseContainer}>
            <div className={classes.closeHeader}>
                <div className={classes.closeIconContainer} onClick={props.onEditClick}><CreateIcon /></div>
                <div className={classes.closeIconContainer} onClick={props.onCancel}><ClearIcon /></div>
            </div>
            <div className={classes.exerciseContent}>
                <ViewExerciseSection name="Name">
                    <div className={classes.exerciseName}>
                        {props.exercise.name}
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection  name="Description">
                    {!!props.exercise.description && (
                        <div className={classes.exerciseDescription}>
                            {props.exercise.description}
                        </div>
                    )}
                </ViewExerciseSection>
                <ViewExerciseSection name="Muscle Groups">
                    <div className={classes.exerciseRowMuscleGroups}>
                        <MuscleGroups muscle_groups={[...new Set(props.exercise.primary_muscles.map(m => m.muscle_group))]} />
                    </div>
                </ViewExerciseSection>
                <ViewExerciseSection  name="Primary Muscles">
                {!!props.exercise.primary_muscles && props.exercise.primary_muscles.length > 0 && (
                    <div className={classes.exerciseSectionList}>
                    {props.exercise.primary_muscles.map(m => titleCase(m.name)).join(', ')}
                    </div>
                )}
                </ViewExerciseSection>
                <ViewExerciseSection name="Secondary Muscles">
                {!!props.exercise.secondary_muscles && props.exercise.secondary_muscles.length > 0 && (
                    <div className={classes.exerciseSectionList}>
                    {props.exercise.secondary_muscles.map(m => titleCase(m.name)).join(', ')}
                    </div>
                )}
                </ViewExerciseSection>
                <ViewExerciseSection name="Categories">
                {!!props.exercise.categories && props.exercise.categories.length > 0 && (
                    <div className={classes.exerciseSectionList}>
                        {props.exercise.categories.join(', ')}
                    </div>
                )}
                </ViewExerciseSection>
                <ViewExerciseSection name="Images">
                {!!props.exercise.images && props.exercise.images.length > 0 && (
                    <div className={classes.exerciseImages}>
                    </div>
                )}
                </ViewExerciseSection>
                <ViewExerciseSection name="Videos">
                {!!props.exercise.videos && props.exercise.videos.length > 0 && (
                    <div className={classes.exerciseVideo}>
                    </div>
                )}
                </ViewExerciseSection>
            </div>
        </div>
    )

}
