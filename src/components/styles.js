import { makeStyles, withStyles } from '@material-ui/styles';

const sidebar_width = 200

const styles = theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        width: sidebar_width,
        background: '#5592FF'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: sidebar_width,
        background: '#5592FF'
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }
})

export const styled = withStyles(styles)

export const useStyles = makeStyles(styles)
