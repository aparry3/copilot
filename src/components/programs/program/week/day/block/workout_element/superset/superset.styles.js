export const styles = theme => ({
    supersetContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `2px solid ${theme.accents.secondary.main}`,
        padding: '0px 10px 10px 10px',
        fontSize: '14px',
        alignItems: 'stretch'
    },
    exerciseContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px'
    },
    supersetContent: {
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
    },
    supersetHeader: {
        padding: '10px 0px 10px 10px',
        display: 'flex',
        alignItems: 'stretch',
        color: theme.text.light

    },
    supersetHeaderTitle: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    supersetHeaderActionContainer: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center'
    },
    supersetHeaderAction: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    action: {
        height: '15px'
    },
    hover: {
        opactiy: 0.5
    }
})
