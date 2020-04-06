export const styles = theme => ({
    block: {
        borderRadius: '5px',
        background: theme.palette.background.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1
    },
    addExerciseContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    addExerciseButton: {
        height: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const dnd_styles = theme => ({
    container: {
        padding: '0px'
    },
    dragAndDrop: {
        borderRadius: '5px',
        background: theme.palette.secondary.main

    },
    addItem: {

    }
})
