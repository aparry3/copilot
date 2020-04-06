import {styles as exerciseStyles} from './exercise.styles'

export const styles = theme => ({
    ...exerciseStyles(theme),
    placholderHeader: {
        width: '40%',
        background: theme.palette.background.mediumDark,
        height: '100%',
        borderRadius: '5px'
    },
    placeholderDetails: {
        width: '60%',
        height: '100%',
        background: theme.palette.background.mediumDark,
        borderRadius: '5px'
    }
})
