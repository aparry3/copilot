export const styles = theme => ({
    imagesContainer: {
        display: 'flex',
        height: '300px',
        flexDirection: 'column',
        justifyContent: 'center',
        background: theme.palette.background.main,
        boxShadow: `0 0 5px -4px ${theme.palette.background.dark} inset`,
        alignItems: 'stretch',
        color: theme.palette.background.medium
    },
    addImages: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        background: theme.palette.background.dark,
        opacity: 0.5
    },
    viewImagesContainer: {
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
