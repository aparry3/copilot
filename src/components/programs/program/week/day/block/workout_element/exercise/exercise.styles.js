export const styles = theme => ({
    exerciseContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `2px solid ${theme.accents.primary.main}`,
        padding: '10px',
        fontSize: '14px'
    },
    exerciseHeader: {
        display: 'flex',
        fontWeight: 500
    },
    exerciseContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    exerciseNotes: {
        padding: '10px',
        fontSize:'12px'
    },
    exerciseDetails: {
        padding: '5px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    exerciseHeaderText: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    exerciseHeaderAction: {
        display: 'flex',
        color: theme.text.light,
        flexDirection: 'column'
    },
    actionContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    action: {
        height: '15px'
    }
})
