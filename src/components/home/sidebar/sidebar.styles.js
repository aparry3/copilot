export const styles = theme => ({

  drawer: {
    minWidth: '65px',
    width: '65px',
    background: "#2866ab",
    display: 'flex',
    flexDirection: 'column',
    color:"white",
    background: theme.palette.primary.main,
    whiteSpace: 'no-wrap',
    overflow: 'hidden',
    '&:hover': {
        width: '180px',
        minWidth: '180px'
    }
  },
  sidebarHeader: {
      height: '70px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'

  },
  sidebarFooter: {
      height: '65px',
      width:"100%"
  },
  footerMenuItem: {
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: 'white'
  },
  footerItem: {
      margin: '5px'
  },
  link: {
      color: "white",
      textDecoration: "none",
      "&:hover": {
          color:"white",
          textDecoration: "none",
      },
  },
  menuItem: {
      height:'65px',
      minHeight: "65px",
      fontWeight: "300",
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
          background: theme.palette.primary.dark
      }
  },
  sidebarIcon: {
      minWidth: '65px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },
  sidebarContent: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
  },
  sidebarTitle: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
      fontWeight: '100',
      fontSize: '30px',
      letterSpacing: '2.5px'
  },
  selected: {
      background: theme.palette.primary.dark
  },
  toolbar: theme.mixins.toolbar,
})
