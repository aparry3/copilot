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
        alignItems: 'center',
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
        display: 'flex',
        justifyContent: 'flex-end',
        height: '30px',
        alignItems: 'center'
    }
})
