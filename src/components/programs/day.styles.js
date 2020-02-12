export const dnd_styles = theme => ({
    container: {
        padding: '5px'
    },
    dragAndDrop: {
        borderRadius: '5px'
    }
})
export const styles = theme => ({
    day: {
        flexShrink: 0,
        width:'33%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px',
        textAlign: 'center',
        height: '100%',
        display: 'flex'
    },
    dayList: {
        overflow: 'auto',
        alignItems: 'center'
    },
    dayContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '5px',
        background: theme.palette.background.light,
        alignItems: 'stretch',
        padding: '5px',
        cursor: 'pointer',
        overflow: 'auto'
    },
    dayContainer: {
        height:'100%',
        width: '95%',
        borderRadius: '5px',
        background: theme.palette.background.mediumDark,
        overflow: 'auto',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column'
    },
    dayDropArea: {
        flexGrow: 1
    },
    dayHeader: {
        marginBottom: '10px'
    },
    addExerciseContainer: {
        borderRadius: '20px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addExercise: {
        cursor: 'pointer',
        opacity: 0.1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        borderRadius: '20px',
        height: '100%',
        '&:hover': {
            opacity: 0.5
        }
    },
    addButton: {
        width: '50%',
        height: '100%',
        opacity: 0.1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        '&:hover': {
            opacity: 1
        }

    },
    paste: {
        borderRadius: '0 20px 20px 0',
        '&:hover': {
            background: theme.accents.secondaryHover
        }
    },
    addNewExercise: {
        borderRadius: '20px 0px 0px 20px',
        '&:hover': {
            background: theme.accents.primaryHover
        }
    },
    addDayContent: {
        height: '100%',
        display: 'flex',
        borderRadius: '5px',
    },
    addDayButton: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    addDayForm: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: theme.palette.background.light,
        borderRadius: '5px'
    },
    addBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.background.main,
        borderRadius: '5px',
        boxShadow: `0 0 8px -7px ${theme.palette.background.dark}`,
        minHeight: '50px',
        flexGrow: 1,
        cursor: 'pointer'
    },
    blockDragAndDrop: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '50px',
        alignItems: 'stretch',
        borderRadius: '5px'
    }
});
