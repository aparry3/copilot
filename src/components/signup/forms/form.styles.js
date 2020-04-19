export const styles = theme => ({
    signupContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '50px'
    },
    signupForm: {
        padding: '40px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    signupFormContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    signupFormHeader: {
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupFormFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
     wordmark: {
         display: 'flex',
         justifyContent: 'center',
         padding: '20px'
     },
     nextActive: {
         cursor: 'pointer',
         color: theme.text.dark
     },
     nextInactive: {
         color: theme.text.light
     },
     title: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         padding: '20px',
         fontSize: '40px',
         fontWeight: 200,
         letterSpacing: '2px'
     },
     subtitle: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         fontSize: '25px',
         fontWeight: 200,
         letterSpacing: '1.5px'

     }


})
