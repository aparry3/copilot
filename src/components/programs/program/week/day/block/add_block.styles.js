import {styles as blockStyles} from './block.styles'

export const styles = theme => ({
    ...blockStyles(theme),
    addBlockText: {
        color: theme.text.light
    },
    addBlock: {
        cursor: 'pointer'
    }
})
