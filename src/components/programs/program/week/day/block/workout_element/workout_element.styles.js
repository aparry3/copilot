export const styles = theme => ({
    workoutElementContainer: {
        padding: '10px 0px',
    },
    workoutElement: {
        cursor: 'pointer',
        background: theme.palette.background.light,
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        '&:hover': {
            opacity: 0.5
        }
    },
    active: {
        background: theme.palette.background.mediumLight
    }
})
