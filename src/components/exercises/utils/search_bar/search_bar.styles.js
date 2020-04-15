export const styles = theme => ({
    searchBar: {
        width: `100%`,
        display: 'flex',
        height: '100%',
        justifyContent: 'space-around',
        borderRadius: '5px',
        fontSize: '14px',
        background: theme.palette.background.light
    },
    search: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent:'flex-start',
        alignItems: 'center',
        padding: '5px',
        color: theme.text.secondary
    },
    icon: {
        width: '30px',
        height: '30px'
    },
    searchIconContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        background: theme.palette.background.light,
        border: 'none',
        borderRadius: '0px 5px 5px 0px',
        flexGrow:1,
        outline: 'none',
        color: theme.text.primary,
        '&::placeholder': {
            color: theme.text.secondary
        }
    }
})
