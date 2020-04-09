export const styles = theme => ({
    supersetContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `2px solid ${theme.accents.secondary.main}`,
        padding: '10px',
        fontSize: '14px',
        alignItems: 'stretch'
    },
    exerciseContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px'
    },
    supersetContent: {
        padding: '5px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    exercise: {
        flexGrow: 1,
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`
    },
    supersetNotes: {
        padding: '10px',
        fontSize:'12px'
    },
    supersetDetails: {
        display: 'flex',
        padding: '5px',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})
