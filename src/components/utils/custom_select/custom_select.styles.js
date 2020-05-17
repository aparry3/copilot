const height = 50

export const styles = theme => ({
    customSelectContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: theme.palette.background.light,
        borderRadius: '5px',
        height: `${height}px`,
        position: 'relative'
    },
    customSelect: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'auto',
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
    },
    customSelectHover: {
        '&:hover': {
            background: theme.palette.background.main
        }
    },
    customSelectText: {
        background: 'transparent',
        color: theme.text.primary,
        outline: 'none',
        border: 'none',
        width: '100%',
    },
    customSelectDropdown: {
        position: 'absolute',
        background: theme.palette.background.light,
        zIndex: 150,
        boxShadow: `${theme.palette.background.dark} 0px 2px 6px -5px`,
        maxHeight: '200px',
        overflow: 'auto',
        padding: '5px',
        top: `${height}px`,
    },
    customSelectChip: {
        height: '30px',
        width: 'auto',
        border: `1px solid ${theme.accents.primary.main}`,
        borderRadius: '15px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.background.light,

    },
    customSelectList: {
        listStyleType: 'none',
        margin: 0,
        width: '100%',
        height: '100%',
        padding: 0,
    },
    customSelectTextContainer: {
        flexGrow: 1,
        marginLeft: '5px',
    },
    customSelectListItem: {
        padding: '10px',
        borderBottom: `1px solid ${theme.palette.background.light}`,
        background: 'white',
        color: theme.text.dark,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main,
            color: theme.text.primary
        }
    },
    deleteChip: {
        cursor: 'pointer',
        height: '30px',
        minWidth: '30px',
        width: '30px',
        borderRadius: '15px',
        background: theme.accents.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center'
    },
    customSelectChipText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '12px',
        fontWeight: 100,
        padding: '5px 5px 5px 10px',
        whiteSpace: 'nowrap',
        color: theme.text.primary
    },
    view: {
        padding: '5px 10px 5px 10px'
    },
    deleteIcon: {
        color: theme.text.dark,
        height: '20px',
        width: '20px'
    }
})
