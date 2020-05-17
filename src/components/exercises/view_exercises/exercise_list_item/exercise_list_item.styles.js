import {styles as viewExercisesStyles} from '../view_exercises.styles'

export const styles = theme => ({
    ...viewExercisesStyles(theme),
    exerciseRowName: {
        width: '50%',
        fontSize: '16px',
        fontWeight: 600,
        padding: '10px'

    },
    exerciseListItem: {
        minHeight: '60px',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    exerciseRowCategories: {
        fontWeight: 200,
        fontSize: '14px',
        padding: '10px'

    },
    exerciseRowMuscleGroups: {
        padding: '10px'

    },
    exerciseRowAction: {
        padding: '10px',
        cursor: 'pointer'

    },
    rowActionIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // exerciseListItem: {
    //     background: theme.palette.background.light,
    //     boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
    //     borderBottom: `1px solid ${theme.palette.background.dark}`,
    //     '&:last-child': {
    //         borderBottom: 'none'
    //     },
    //     cursor: 'pointer',
    //     '&:hover': {
    //         background: theme.palette.background.main
    //     },
    //     height: '80px'
    // },
    selected: {
        background: theme.palette.background.main
    }
})
