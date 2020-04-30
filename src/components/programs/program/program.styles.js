export const styles = theme => ({
    programPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    programHeaderOptions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    programPage: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        overflow: 'hidden'
    },
    back: {
        color: theme.text.secondary,
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    programContent: {
        flexGrow: 1,
        display: 'flex',
        overflow: 'auto'
    },
    week: {
        flexGrow: 1,
        overflow: 'auto'
    },
    exportButton: {
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.text.white,
        cursor: 'pointer',
        fontSize: '16px',
        height: '30px',
        width: '50px',
        background: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.dark
        }
    },

});
