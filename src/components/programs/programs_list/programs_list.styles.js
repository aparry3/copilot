export const styles = (theme) => ({
    programListPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    programListHeader: {
        height: '50px',
        textAlign: 'left',
        width: '100%',
        fontSize: '14px',
        fontWeight: 100,
        color: theme.text.dark,
        opacity: 0.3,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0px 0px 5px 0px'
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    },
    programListPageContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    programListContainer: {
        width: '100%',
        flexGrow: 1,
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    programListBody: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    programListRow: {
        width: '100%',
        display: 'flex',
        minHeight: '60px',
        cursor: 'pointer',
        alignItems: 'center',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    programInputRow: {
        width: '100%',
        display: 'flex',
        minHeight: '60px',
        alignItems: 'center',
    },
    programRowName: {
        width: '50%',
        fontSize: '16px',
        fontWeight: 600,
        padding: '10px'

    },
    programRowLength: {
        fontWeight: 200,
        fontSize: '14px',
        padding: '10px'

    },
    programRowLastModified: {
        padding: '10px'

    },
    programRowAction: {
        padding: '10px',
        cursor: 'pointer'

    },

    headerText: {
        fontWeight: 200
    },
    lengthColumn: {
        width: '20%'
    },
    lastModifiedColumn: {
        width: '30%'
    },
    actionColumn: {
        width: '10%'
    },
    nameColumn: {
        flexGrow: 2,
        width: '40%'
    },
    programHeaderAction: {
        display: 'flex',
        alignItems: 'center',
        jusitfyContent: 'center',
        height: '100%',
        padding: '20px',
    },
    addIconContainer: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        },
        borderRadius: '5px',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'

    },
    programLengthInputGroup: {
        display: 'flex',
        alignItems: 'center'
    },
    programInputActions: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    programInputAction: {
        display: 'flex',
        alignItems: 'center',
        jusitfyContent: 'center',
        padding: '5px'
    },
    programInputField: {
        borderRadius: '5px',
        border: `1px solid ${theme.palette.background.light}`,
        padding: '8px',
    },
    programLengthInputField: {
        width: '30px',
        textAlign: 'center',
    },
    programLengthInputLabel: {
        padding: '5px',
        display: 'flex',
        alignItems:'center'
    }

})
