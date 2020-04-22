export const styles = theme => ({
    supersetContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 10px 10px 10px',
        fontSize: '14px',
        alignItems: 'stretch'
    },
    supersetColor: {
        borderLeft: `2px solid ${theme.accents.secondary.main}`
    },
    schemeColor: {
        borderLeft: `2px solid ${theme.accents.tertiary.main}`
    },
    exerciseContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
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
    alternateDetail: {
        display: 'flex',
        color: theme.text.light,
        alignItems: 'center'
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
