export const styles = theme => ({
    confirmContainer: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    closeMessage: {
        position: 'absolute',
        background: theme.palette.background.dark,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: .5,
    },
    messageContainer: {
        background: theme.palette.background.light,
        height: '30%',
        zIndex: 1,
        borderRadius: '5px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    messageContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    messageActions: {
        display: 'flex',
        alignItems: 'center',
        alignItems: 'stretch',
    },
    messageActionContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '20px'
    },
    messageAction: {
        flexGrow: 1,
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageConfirm: {
        background: theme.accents.primary.main,
        color: theme.text.accents.primary.main,
        '&:hover': {
            background: theme.accents.primary.hover,
            color: theme.text.accents.primary.hover,
        }
    },
    messageCancel: {
        background: theme.accents.error.main,
        color: theme.text.accents.error.main,
        '&:hover': {
            background: theme.accents.error.hover,
            color: theme.text.accents.error.hover,
        }
    }
})
