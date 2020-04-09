import {styles as formStyles} from '../form_fields.styles'
export const styles = theme => ({
    ...formStyles(theme),
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
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
    },
    detailRowInput: {
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        padding: '0px 10px'
    }
})
