export const styles = theme => ({
    viewEditWorkoutElementContainer: {
        display: 'flex',
        padding: '10px',
        flexDirection: 'column',
        minWidth: '40%',
        width: '40%',
        justifyContent: 'space-between',
        background: theme.palette.background.light,
        borderLeft: `2px solid ${theme.palette.background.mediumDark}`,
        alignItems:'stretch'
    },
    viewEditWorkoutElement: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    viewEditWorkoutElementHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
        fontSize: '20px',
        color: theme.text.light
    },
    workoutElementForm: {
        padding: '10px'
    },
    viewEditWorkoutElementClose: {
        cursor: 'pointer'
    },
    viewEditWorkoutElementFooter: {
        display: 'flex',
        justifyContent: 'space-around',
        height: '50px'
    },
    viewEditWorkoutElementActionContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        cursor: 'pointer',
        padding: '5px',
    },
    viewEditWorkoutElementAction: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
        '&:hover': {
            background: theme.palette.background.main
        }
    }
})
