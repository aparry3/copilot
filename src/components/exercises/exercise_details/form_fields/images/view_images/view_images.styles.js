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
        padding: '10px'
    },
    image: {
        height: '100%',
        border: 'none',
        boxShadow: `0 0 10px -7px ${theme.palette.background.dark}`,
        position: 'relative'
    },
    delete: {
        borderRadius: '50%'
    }
})
