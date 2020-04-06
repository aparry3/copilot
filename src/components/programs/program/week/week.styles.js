export const styles = theme => ({
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
        flexGrow: 1,
    },
    weekContent: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'auto'
    },
    emptyWeek: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '25px',
        fontWeight: '400',
    },
    emptyWeekMessage: {
        width: '40%',
        background: theme.palette.background.light,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '70%'
    },
    emptyWeekMessageText: {
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    addDayButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    days: {
        display: 'flex',
        alignItems: 'stretch',
        padding: '20px 30px 0px 30px'
    }
})
