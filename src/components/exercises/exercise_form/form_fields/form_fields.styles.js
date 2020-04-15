export const styles = theme => ({
    formSection: {
        flexGrow: 1,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        background: theme.palette.background.light,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
        padding: '10px'
    },
    formSectionContainer: {
        display: 'flex',
        width: '90%'
    },
    formSectionHeader: {
        height: '20px',
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 300
    },

    formSectionInput: {
        color: theme.text.primary,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: '5px',
        '&:hover': {
            background: theme.palette.background.main
        },
        '&:focus': {
            background: theme.palette.background.mediumDark
        }
    }

})
