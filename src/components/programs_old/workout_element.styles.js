const TOOLTIP_WIDTH = 100
const TOOLTIP_HEIGHT = 80
const ARROW_SIZE = 15


export const dnd_styles = theme => ({
    container: {
        padding: '10px'
    },
    dragAndDrop: {
        borderRadius: '5px',
        background: theme.palette.primary.main

    }
})


export const styles = theme => ({
    exerciseContent: {
        display: 'flex',
        height:' 100%',
        background: theme.palette.background.main,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 'inherit',
        cursor: 'move'

    },
    exerciseBlock: {
        borderRadius: '15x',
        minHeight: '70px',
        width: '100%',
        position: 'relative',
        margin: '0px 0px 10px 0px',
        boxShadow: `0px 1px 8px -5px ${theme.palette.background.dark}`

    },
    dragAndDrop: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        opacity: 0,
        flexDirection: 'column'
    },
    workoutElement: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'stretch',
        padding: '5px'
    },
    hoverOverlay: {
        height:'100%',
        width: '100%',
        borderRadius: '5px',
        background: '#000000',
        opacity: 0.5,
        position: 'absolute'
    },
    supersetBlock: {
        margin: '0px 0px 10px 0px',
        width: '100%'
    },
    supersetContent: {
        width: '100%',
        background: theme.palette.secondary.main,
        borderRadius: '5px',
        padding: '0 5%',
        cursor: 'move'
    },
    cardContent: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        flexGrow: 1
    },
    exerciseHeader: {
        height: '40px',
        width: '100%',
        borderRadius: '5px 5px 0px 0px',
        background: theme.accents.primary,
        display: 'flex',
        flexDirection: 'row',
        overflow:'hidden',
        textOverflow:  'ellipsis',
        color: theme.text.dark,
        color: "black",
        padding: '10px'
    },
    exerciseNameContainer: {
        flexGrow: 1,
        width:'85%',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        minWidth: '0px'
    },
    exerciseName: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    exerciseDetails: {
        height: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        justifyContent: 'space-between',
        fontSize: '14px'

    },
    notesContainer: {
        flexGrow: 1,
        color: '#cbced0',
        fontSize: '12px',
        textAlign: 'left',
        padding: '5px 10px 0px 10px'
    },
    exerciseIcons: {
        height: '40%',
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontSize: '12px'
    },
    deleteContainer: {
        width: '10%',
        display: 'flex',
        alignItems: 'center'
    },
    deleteIcon: {
        heigh: '15px',
        width: '15px',
        cursor: 'pointer'
    },
    detailIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    drag: {
        alignSelf: 'center'
    },
    exerciseScheme: {
        justifySelf: 'center'
    },
    superset: {
        width: '100%',
    },
    supersetDeleteContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    supersetDetails: {
        marginTop: '-10px'
    },
    optionMenu: {
        display: 'flex',
        boxShadow: `0 0 15px -5px ${theme.palette.background.dark}`,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${TOOLTIP_HEIGHT}px`,
        width: `${TOOLTIP_WIDTH}px`,
        position: 'fixed',
        zIndex: '10',
        background: theme.palette.background.tooltip,
        border: 'none',
        padding: '5px',
        borderRadius: '10px'
    },
    rightClickUnderlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zindex: '7'
    },
    arrow: {
        position: 'absolute',

        left: `-${ARROW_SIZE}px`,
        width: 0,
        height: 0,
        borderRight: `${ARROW_SIZE}px solid ${theme.palette.background.tooltip}`,
        borderBottom: `${ARROW_SIZE}px solid transparent`,
        borderTop: `${ARROW_SIZE}px solid transparent`
    },
    optionButton: {
        width: '100%',
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '5px',
        border:'none',
        cursor: 'pointer'
    },
    deleteButton: {
        background: theme.accents.error,
        '&:hover': {
            background: theme.accents.errorHover
        }
    },
    copyButton: {
        background: theme.accents.secondary,
        '&:hover': {
            background: theme.accents.secondaryHover
        }
    },
    optionButtonContainer: {
        padding:'5px',
        width: '100%'
    }

})
