export const styles = theme => ({
    viewImagesContainer: {
        display: 'flex',
        flexGrow: 1,
        padding: '10px',
        alignItems: 'stretch',
        maxHeight: '80%',
        overflow: 'auto'
    },
    viewImage: {
        height:'100%',
        padding: '10px',
        position: 'relative'
    },
    image: {
        height: '100%',
        border: 'none',
        boxShadow: `0 0 10px -7px ${theme.palette.background.dark}`,
    },
    deleteBubble: {
        borderRadius: '50%',
        position: 'absolute',
        height: '30px',
        width: '30px',
        top: 0,
        left: 0,
        background: theme.palette.background.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `0 0 10px -5px ${theme.palette.background.dark}`
    },
    deleteIcon: {
        height: '15px',
        width: '15px'
    }
})
