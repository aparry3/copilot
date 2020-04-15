export const styles = theme => ({
    exercisesPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    toolbar: theme.mixins.toolbar,
    viewExercisesContainer: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '85%',
        overflow: 'hidden'
    },
    exercisesListPageContainer: {
        minWidth: '65%',
        width: '75%',
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    exercisesListContainer: {
        width: '100%',
        flexGrow: 1,
        padding: '20px',
        overflow: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    exerciseViewContainer: {
        background: theme.palette.background.light,
        height: '100%',
        paddingLeft: '20px',
        padding: '5px',
        minWidth: '30%',
        width: '30%'
    },
    exerciseListBody: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    exerciseListItemContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'

    },
    exercisesList: {
        style: 'none',
        margin: 0,
        padding: 0
    },
    exerciseListHeader: {
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
    exerciseName: {
        height: '65%',
        width: '100%',
        fontSize: '22px',
        color: theme.text.white,
        fontWeight: 100,
        overflow:'hidden',
        textOverflow: 'ellipsis'
    },
    exerciseDetails: {
        height: '35%',
        width: '100%',
        color: theme.text.primary,
        fontSize: '12px'
    },
    headerText: {
        fontWeight: 200
    },
    categoriesColumn: {
        width: '20%'
    },
    muscleGroupsColumn: {
        width: '30%'
    },
    actionColumn: {
        width: '10%'
    },
    nameColumn: {
        flexGrow: 2,
        width: '40%'
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    },
    exercisesHeaderAction: {
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
})
