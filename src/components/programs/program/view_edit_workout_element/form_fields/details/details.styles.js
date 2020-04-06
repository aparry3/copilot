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
        display: 'flex',
        alignItems: 'stretch'
    },
    addDetailText: {
        cursor: 'pointer',
        flexGrow: 1,
        '&:hover': {
            background: theme.palette.background.main
        }
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    }
})
