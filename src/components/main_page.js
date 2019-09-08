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

// TODO
// Change Links to dynamically generated path and text using a map

const styles = (theme) => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0),
    }
});
const useStyles = makeStyles(styles);
const styled = withStyles(styles)

class MainPage extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/trainer' component={Trainer} />
                    <Route path="/login" component={Login} />
                    <Route path="/?code=" render={() => {
                        return (
                            <Redirect to={{
                                pathname: "/trainer",
                                state: { from: props.location }
                            }} /> )
                        }}/>
                    <Route component={Home} />
                </Switch>
            </Router>

        )
    }
}

const Trainer = styled(connect(state => {
    console.log(state.auth)
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
                        <Route exact path={`${match.path}`} render={() => <div>trainer page</div>} />
                        <Route path={`${match.path}/exercises`} component={ExercisesPage} />
                        <Route path={`${match.path}/programs`} component={ProgramPage} />
                    </Main>
                </div>
            ) : (
                <Redirect to={{
                  pathname: "/login",
                  state: { from: props.location }
              }}/>
          )}</div>)}
        </div>

    )
}))

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
function Main(props) {
    let classes = useStyles();
    return (
        <main className={classes.content}>
            {props.children}
        </main>
    );
}
function Login(props) {
    return (
        <div>
            <h2>Login</h2>
            <button className="btn btn-success" onClick={() => login()} > Login </button>
        </div>
    )
}

export default styled(MainPage);
