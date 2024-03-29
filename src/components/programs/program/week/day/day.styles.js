export const styles = theme => ({
    dayContainer: {
        display: 'flex',
        width: '400px',
        padding: '20px'
    },
    day: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1
    },
    dayContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        overflow: 'auto'
    },
    dayHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        fontWeight: 600,
        justifyContent: 'space-between'
    },
    dayHeaderTitle: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    dayHeaderAction: {
        display: 'flex',
        alignItems: 'center',
        color: theme.text.light,
        cursor: 'pointer'
    },
    addDayText: {
        fontWeight: 300,
        color: theme.text.light,
        cursor: 'pointer'
    },
    emptyDayContainer: {
        padding: '10px 0px 0px 0px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'

    },
    emptyDay: {
        backgroundImage: `linear-gradient(#ebeef1 , ${theme.palette.background.main})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
    },
    action: {
        height: '20px'
    }
})
