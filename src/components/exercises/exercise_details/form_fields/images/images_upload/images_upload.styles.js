export const styles = theme => ({
    imagesUploadContainer: {
        display: 'flex',
        height: '300px',
        flexDirection: 'column',
        justifyContent: 'center',
        background: theme.palette.background.main,
        boxShadow: `0 0 5px -4px ${theme.palette.background.dark} inset`,
        alignItems: 'stretch',
        cursor: 'pointer',
        color: theme.palette.background.medium
    },
    emptyImages: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5
    },
    input: {
        height: 0,
        width: 0,
        overflow: 'hidden'
    },
    imageUploadIcon: {
        height: '100px',
        width: '100px',
    },
    uploadImagesText: {
        display: 'flex',
        padding: '20px',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
