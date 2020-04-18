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
    signupFormFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
     signup: {
         width: '60%',
         borderRadius: '5px',
         boxShadow: `${theme.palette.background.dark} 0px 0px 5px -3px`,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'stretch'
     },
     userTypeHeader: {
         padding: '40px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center'
     },
     userTypeTitle: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         padding: '20px',
         fontSize: '40px',
         fontWeight: 200,
         letterSpacing: '2px'
     },
     signupUserTypesTitle: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         fontSize: '25px',
         fontWeight: 200,
         letterSpacing: '1.5px'

     },
     signupUserTypes: {
         flexGrow: 1,
         display: 'flex',
         padding :'20px',
         alignItems: 'stretch'
     },
     signupUserTypeContainer: {
         flexGrow: 1,
         padding: '10px',
         display: 'flex',
         alignItems: 'stretch'
     },
     signupUserType: {
         cursor: 'pointer',
         flexGrow: 1,
         padding: '20px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'stretch',
         borderRadius: '5px',
         border: `${theme.palette.background.dark} solid 1px`
     },
     signupUserTypeIcon: {
         display: 'flex',
         flexGrow: 1,
         alignItems: 'center',
         justifyContent: 'center'
     },
     signupUserTypeTitle: {
         display: 'flex',
         padding: '10px',
         fontSize: '25px',
         fontWeight: 200,
         alignItems: 'center',
         justifyContent: 'center'
     },
     wordmark: {
         display: 'flex',
         justifyContent: 'center',
         padding: '20px'
     },
     icon: {
         height: '60px',
         width: '60px'
     },
     selected: {
         color: theme.text.white,
         background: theme.palette.primary.main
     },
     nextActive: {
         cursor: 'pointer',
         color: theme.text.dark
     },
     nextInactive: {
         color: theme.text.light
     }


})
