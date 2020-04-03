export const styles = theme => ({
    overview: {
        flexGrow: 1,
        overflow: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    weekContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    weekHeader: {
        width: '100%',
        height: '50px',
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: theme.text.light
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
    weekTitle: {
        display:'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    collapseContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px'
    },
    expanded: {
        minHeight: '90%'
    }


})
