export const styles = theme => ({
    viewEditWorkoutElement: {
        display: 'flex',
        padding: '10px',
        flexDirection: 'column',
        minWidth: '40%',
        width: '40%',
        background: theme.palette.background.light,
        borderLeft: `2px solid ${theme.palette.background.mediumDark}`
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
    }
})
