export const styles = theme => ({
    blockContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 0px',
        alignItems: 'stretch'
    },
    block: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 10px',
        alignItems: 'stretch',
        background: theme.palette.background.mediumLight,
        boxShadow: `inset ${theme.palette.background.dark} 0px 0px 5px -3px`,
        borderRadius: '5px'
    }
})
