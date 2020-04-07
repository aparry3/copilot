import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {ExercisesPage} from './exercises';
import {ProgramPage} from './programs';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Sidebar, SidebarList} from './sidebar';
import {Loading, Logo} from './utils';
import {history} from '../util'
import {login} from '../actions'
import {Dashboard} from './dashboard'

// TODO
// Change Links to dynamically generated path and text using a map

const styles = (theme) => {
    return {
        app: {
          display: 'flex',
          width: '100%',
          alignItems: 'stretch',
          background: theme.palette.background.main,
          color: theme.text.primary,
          letterSpacing: theme.text.letterSpacing
        },
        appContainer: {
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'stretch'
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'stretch',
            padding: theme.spacing(0),
            minWidth: '0px',
            minHeight: '100vh'
        },
        trainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'stretch'
        }
    }
};
const useStyles = makeStyles(styles);
const styled = withStyles(styles)

const MainPage = props => {
    let classes = useStyles()

    return (
        <div className={classes.appContainer}>
        {props.client_loaded ?
            (<Router history={history}>
                <Switch>
                    <Route path='/trainer' component={Trainer} />
                    <Route path="/login" component={Login} />
                    <Redirect to='/login'/>
                </Switch>
            </Router>) : <Loading />
        }
        </div>
    )
}

const Trainer = styled(connect(state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading,
        client_loaded: state.auth.client_loaded
    }
})((props) => {
    let {match, classes} = props;
    return(
        <div className={classes.trainer}>
            {!props.client_loaded || props.loading ? ( <Loading />) : (
            <>
            {!!props.user ? (
                <div className={classes.app}>
                    <Sidebar path={match.path}/>
                    <Main>
                        <Switch>
                            <Route path={`${match.path}/exercises`} component={ExercisesPage} />
                            <Route path={`${match.path}/programs`} component={ProgramPage} />
                            <Route path={`${match.path}/dashboard`} component={Dashboard} />
                            <Redirect to={`${match.path}/programs`}/>
                        </Switch>
                    </Main>
                </div>
            ) : (
                <Redirect to={{
                  pathname: "/login",
                  state: { targetUrl: props.location }
              }}/>
          )}</>)}
        </div>

    )
}))


function Main(props) {
    let classes = useStyles();
    return (
        <main className={classes.content}>
            {props.children}
        </main>
    );
}
function Login(props) {
    function getAppState() {
        return {appState: !!props.location.state ? props.location.state : {targetUrl: {pathname: '/trainer'}}}
    }
    return (
        <div>
            <h2>Login</h2>
            <button className="btn btn-success" onClick={() => login(getAppState())} > Login </button>
        </div>
    )
}

export default connect(state => {
    return {
        client_loaded: state.auth.client_loaded
    }
})(MainPage);
