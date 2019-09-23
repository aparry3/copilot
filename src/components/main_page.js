import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {ExercisesPage} from './exercises';
import {ProgramPage} from './programs';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Sidebar, SidebarList} from './sidebar';
import {Logo} from './util';
import {history} from '../util'
import {login} from '../actions'
import {Dashboard} from './dashboard'

// TODO
// Change Links to dynamically generated path and text using a map

const styles = (theme) => ({
    root: {
      display: 'flex',
      background: '#f6f8f9',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        height: '100vh'
    }
});
const useStyles = makeStyles(styles);
const styled = withStyles(styles)

class MainPage extends React.Component {

    render() {

        return (
            <div>
            {this.props.client_loaded ?
                (<Router history={history}>
                    <Switch>
                        <Route path='/trainer' component={Trainer} />
                        <Route path="/login" component={Login} />
                        <Redirect to='/login'/>
                    </Switch>
                </Router>) : <div>Loading...</div>
            }
            </div>

        )
    }
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
        <div>
            {!props.client_loaded || props.loading ? ( <div>Loading...</div>) : (<div>
            {!!props.user ? (
                <div className={classes.root}>
                    <Sidebar path={match.path}/>
                    <Main>
                        <Switch>
                            <Route path={`${match.path}/exercises`} component={ExercisesPage} />
                            <Route path={`${match.path}/programs`} component={ProgramPage} />
                            <Route path={`${match.path}/dashboard`} component={Dashboard} />
                            <Redirect to={`${match.path}/dashboard`}/>
                        </Switch>
                    </Main>
                </div>
            ) : (
                <Redirect to={{
                  pathname: "/login",
                  state: { targetUrl: props.location }
              }}/>
          )}</div>)}
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
})(styled(MainPage));
