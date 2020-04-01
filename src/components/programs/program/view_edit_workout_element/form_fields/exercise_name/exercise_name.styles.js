import {styles as formStyles} from '../form_fields.styles'

const height = 30

export const styles = theme => ({
    ...formStyles(theme),
    exerciseNameText: {
        flexGrow: 1,

    },
    exerciseList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'absolute',
        left: 0,
        right: 0,
        top: `${height}px`,
        height: '200px',
        overflow: 'auto'
    },
    exerciseListItem: {
        height: '30px',
        display: 'flex',
        '&:hover': {

        }
    }
})
