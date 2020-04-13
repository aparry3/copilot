export const styles = theme => ({
    viewEditWorkoutElementContainer: {
        display: 'flex',
        padding: '20px',
        flexDirection: 'column',
        minWidth: '40%',
        width: '40%',
        justifyContent: 'space-between',
        background: theme.palette.background.light,
        borderLeft: `2px solid ${theme.palette.background.mediumDark}`,
        alignItems:'stretch'
    },
    viewEditWorkoutElement: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    viewEditWorkoutElementHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
        fontSize: '20px',
        color: theme.text.light,
        padding: '10px'
    },
    viewEditWorkoutElementContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflow: 'auto',
        flexGrow: 1
    },
    exerciseFormContainer: {
        padding: '5px'
    },
    addExercise: {
        cursor: 'pointer',
        color: theme.text.light
    },
    exerciseFormHeader: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        justifyContent: 'space-between',
        color: theme.text.light,
        height: '30px'
    },
    actionContainer: {
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'
    },
    action: {
        height: '15px'
    },
    exerciseForm: {
        padding: '0px 10px 10px 10px',
        borderRadius: '5px',
        boxShadow: `inset ${theme.palette.background.dark} 0px 0px 5px -3px`,
        background: theme.palette.background.main
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
