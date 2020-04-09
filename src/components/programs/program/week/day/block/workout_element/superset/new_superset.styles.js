import {styles as supersetStyles} from './superset.styles'

export const styles = theme => ({
    ...supersetStyles(theme),
    placholderHeader: {
        width: '70%',
        background: theme.palette.background.mediumDark,
        height: '30px',
        borderRadius: '5px'
    },
    placeholderDetails: {
        width: '60%',
        height: '30px',
        background: theme.palette.background.mediumDark,
        borderRadius: '5px'
    }
})
