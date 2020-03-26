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
        overflow: 'auto'
    },
    weekContent: {
        display: 'flex',
        flexGrow: 1
    },
    emptyWeek: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '25px',
        fontWeight: '400',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        }
    }
})
