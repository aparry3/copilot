import {styles as formStyles} from '../form_fields.styles'
export const styles = theme => ({
    ...formStyles(theme),
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
        flexGrow:1,
    },
    addDetail: {
        position: 'relative',
        padding: '5px',
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main
        }

    }
})
