export const styles = theme => ({
    closeExerciseForm: {
        position: 'absolute',
        background: theme.palette.background.dark,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: .5,
    },
    exerciseFormContainer: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
        justifyContent: 'center',
        zIndex: 100
    },
    exerciseFormPopupContainer: {
        padding: '200px 0px',
        overflow: 'auto',
        width: '50%',
        zIndex: 101
    },
    exerciseFormPopup: {
        background: theme.palette.background.light,
        zIndex: 1,
        borderRadius: '5px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    exerciseForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.text.primary,
        padding: '10px',
        background: theme.palette.background.main,
        overflow: 'auto'
    },
    form: {
        width: '100%',
        height: '100%'
    },
    nameInput: {
        fontSize: '25px',
        fontWeight: 100
    },
    formSectionInputContainer: {
        padding: '5px',
        width: '100%'
    },
    description: {
        minWidth: '50%'
    }
})
