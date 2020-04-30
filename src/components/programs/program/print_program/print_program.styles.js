export const styles = theme => ({
    program: {
        position: 'absolute',
        top: 0,
        left: '-65px',
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: theme.palette.background.light,
        minHeight: '100vh'
    },
    weekHeader: {
        padding: '10px',
        fontSize: '20px',
        fontWeight: 600
    },
    week: {
        display: 'flex',
        pageBreakAfter: 'always',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        border: `1px solid ${theme.palette.background.dark}`
    },
    weekContent: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch'
    },
    day: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        border: `1px solid ${theme.palette.background.dark}`
    },
    dayHeader: {
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 600
    },
    dayTitle: {
        flexGrow:1,
    },
    dayContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    block: {
        padding: '10px',
        borderBottom: `2px solid ${theme.palette.background.dark}`,
        borderTop: `2px solid ${theme.palette.background.dark}`
    },
    exercise: {
        fontSize: '12px',
        fontWeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    exerciseName: {
        display: 'flex'
    },
    exerciseNameText: {
        padding: '0px 5px 0px 5px',
        flexGrow: 1
    },
    exerciseDetails: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    workoutElement: {
        padding: '5px',
        borderBottom: `1px solid ${theme.palette.background.mediumDark}`
    },
    supersetHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
        alignItems: 'center'
    },
    supersetHeaderDetails: {
        display: 'flex',
        padding: '3px',
        fontSize: '12px',
        fontWeight: 300
    },
    supersetHeaderDetail: {
        padding: '0px 5px 0px 5px',
    },
    supersetDetails: {
        display: 'flex',
        padding: '5px 0px',
        justifyContent: 'flex-end',
        fontSize: '14px'
    },
    supersetNotes: {
        display: 'flex',
        fontSize: '12px'
    },
    supersetNotesTitle: {
        fontWeight: 500
    },
    supersetNotesValue: {
        fontWeight: 300,
        flexGrow: 1,
        padding: '0px 5px 0px 5px'
    },
    detail: {
        padding: '0px 5px'
    },
    name: {
        fontWeight: 500
    }
})
