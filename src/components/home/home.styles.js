export const styles = (theme) => {
    return {
        app: {
          display: 'flex',
          width: '100%',
          alignItems: 'stretch',
          background: theme.palette.background.main,
          color: theme.text.primary,
          letterSpacing: theme.text.letterSpacing
        },
        content: {
            flexGrow: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'stretch',
            padding: theme.spacing(0),
            minWidth: '0px',
            minHeight: '100vh'
        },
        home: {
            width: '100%',
            display: 'flex',
            alignItems: 'stretch'
        }
    }
};
