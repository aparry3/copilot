export const styles = theme => ({
    blockContainer: {
        padding: '5px 0px',
    },
    block: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 10px 20px 10px',
        alignItems: 'stretch',
        background: theme.palette.background.mediumLight,
        boxShadow: `inset ${theme.palette.background.dark} 0px 0px 5px -3px`,
        borderRadius: '5px'
    },
    blockHeader: {
        height: '20px',
        paddingTop: '10px',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        color: theme.text.light,
        fontSize: '10px'
    },
    blockHeaderTitle: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1
    },
    blockHeaderActions: {
        display: 'flex',
        alignItems:'center'
    },
    action: {
        height: '15px',
        weigth: '15px'
    },
    actionContainer: {
        cursor: 'pointer'
    },
    emptyBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.text.light,
        height: '50px'
    }
})
