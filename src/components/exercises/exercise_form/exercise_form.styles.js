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
    exerciseFormModalContainer: {
        padding: '200px 0px',
        overflow: 'auto',
        width: '50%',
        zIndex: 101
    },
    exerciseFormModal: {
        background: theme.palette.background.light,
        zIndex: 1,
        borderRadius: '5px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    exerciseFormModalHeader: {
        color: theme.text.light,
        display: 'flex',
        padding: '20px',
        alignItems:'center',
        fontSize: '24px'
    },
    exerciseForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        color: theme.text.primary,
        padding: '10px',
        overflow: 'auto'
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
    },
    exerciseFormActions: {
        display: 'flex',
        alignItems: 'stretch',
        padding: '20px',
        justifyContent: 'space-around'
    },
    exerciseFormAction: {
        display: 'flex',
        borderRadius: '5px',
        alignItems: 'center',
        padding: '10px',
        justifyContent: 'center',
        cursor: 'pointer',
        width: '20%'
    },
    saveButton: {
        background: theme.accents.primary.main,
        color: theme.text.accents.primary.main,
        '&:hover': {
            background: theme.accents.primary.hover,
            color: theme.text.accents.primary.hover,
        }
    },
    cancelButton: {
        background: theme.accents.error.main,
        color: theme.text.accents.error.main,
        '&:hover': {
            background: theme.accents.error.hover,
            color: theme.text.accents.error.hover,
        }
    }

})
