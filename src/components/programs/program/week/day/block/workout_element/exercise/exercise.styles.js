export const styles = theme => ({
    exerciseContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `2px solid ${theme.accents.primary.main}`,
        padding: '10px'
    },
    exerciseHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    exerciseContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    exerciseNotes: {
    },
    exerciseDetails: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '30px',
        alignItems: 'center'
    }
})
