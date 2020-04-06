export const styles = theme => ({
    formFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
        padding: '10px'
    },
    formFieldContent: {
        display: 'flex',
        padding: '10px',
        flexGrow: 1,
        alignItems: 'center'
    },
    formFieldHeader: {
        padding: '0px 0px 0px 10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px'
    },
    emptyForm: {
        cursor: 'pointer',
        padding: '5px',
        '&:hover': {
            background: theme.palette.background.main
        }
    }

})
