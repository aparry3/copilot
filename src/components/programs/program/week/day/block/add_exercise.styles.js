const height = 30

export const styles = theme => ({
    addExercise: {
        margin: '10px 0px',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        position: 'relative'
    },
    addExerciseButton: {
        background: theme.palette.background.light,
        height: `${height}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: `${theme.palette.background.dark} 0px 0px 6px -5px`,
        '&:hover': {
            boxShadow: 'none',
            opacity: 0.5
        },
        flexGrow:1
    },
    addExercisePopup: {
        padding: '5px',
        position: 'absolute',
        left: 0,
        right: 0,
        top: `${height}px`,
        display: 'flex',
        background: theme.palette.background.light,
        flexDirection: 'column',
        alignItems: 'stretch',
        boxShadow: `${theme.palette.background.dark} 0px 2px 6px -5px`
    },
    addExerciseTypeContainer: {
        height: '50px',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: '5px'
    },
    addExerciseType: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    exercise: {
        background: theme.accents.primary.main,
        color: theme.text.accents.primary.main,
        '&:hover': {
            background: theme.accents.primary.hover,
            color: theme.text.accents.primary.hover
        }
    },
    superset: {
        background: theme.accents.secondary.main,
        color: theme.text.accents.secondary.main,
        '&:hover': {
            background: theme.accents.secondary.hover,
            color: theme.text.accents.secondary.hover,
        }
    }
})
