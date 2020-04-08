import {styles as exerciseStyles} from './exercise.styles'

export const styles = theme => ({
    ...exerciseStyles(theme),
    placholderHeader: {
        width: '70%',
        background: theme.palette.background.mediumDark,
        height: '30px',
        borderRadius: '5px'
    },
    placeholderDetails: {
        width: '60%',
        height: '100%',
        background: theme.palette.background.mediumDark,
        borderRadius: '5px'
    }
})
