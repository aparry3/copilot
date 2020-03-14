export const styles = theme => ({
    programPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    programHeaderOptions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    programPage: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        overflow: 'hidden'
    },
    back: {
        color: theme.text.secondary,
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    program: {
        flexGrow: 1,
        overflow: 'auto'
    },
    weekContainer: {
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column'
    },
    weekHeader: {
        width: '100%',
        height: '50px',
        padding: '0 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deleteWeek: {
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        color: theme.text.secondary,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            color: theme.text.accents.error,
            background: theme.accents.error
        }
    },
    deleteIcon: {
        height: '25px'
    },
    addWeekSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    addWeek: {
        borderRadius: '25px',
        height: '50px',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        background: theme.palette.background.mediumDark,
        opacity: 0.1,
        '&:hover': {
            opacity: .5
        }
    },
    week: {
        height: '100%'
    }

});
