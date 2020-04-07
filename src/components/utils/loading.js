import React from 'react'

import {makeStyles} from '@material-ui/core/styles';

const size = 50
const styles = theme => ({
    loadingContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        border: `10px solid ${theme.palette.background.main}`,
        borderTop: `10px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        height: `${size}px`,
        width: `${size}px`,
        animation: `$spin 2s linear infinite`
    },
    '@keyframes spin': {
     '0%': { transform: 'rotate(0deg)' },
     '100%': { transform: 'rotate(360deg)' }
    }

})
const useStyles = makeStyles(styles)

export const Loading = props => {
    let classes = useStyles()
    return (
        <div className={classes.loadingContainer}>
            <div className={classes.loading}>
            </div>
        </div>
    )
}
