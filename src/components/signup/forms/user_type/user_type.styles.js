export const styles = theme => ({
     userTypes: {
         flexGrow: 1,
         display: 'flex',
         padding :'20px',
         alignItems: 'stretch'
     },
     userTypeContainer: {
         flexGrow: 1,
         padding: '10px',
         display: 'flex',
         alignItems: 'stretch'
     },
     userType: {
         cursor: 'pointer',
         flexGrow: 1,
         padding: '20px',
         color: theme.text.light,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'stretch',
         borderRadius: '5px',
         border: `${theme.palette.background.mediumDark} solid 1px`
     },
     typeIcon: {
         display: 'flex',
         flexGrow: 1,
         alignItems: 'center',
         justifyContent: 'center'
     },
     typeTitle: {
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
