import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {ExercisesPage} from './exercises';
import {WorkoutsPage} from './workouts';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Sidebar, SidebarList} from './sidebar';
import {Logo} from './util';

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
const styled = withStyles(styles);
class MainPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                        <Sidebar />
                        <Main>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route path="/exercises" component={ExercisesPage} />
                            <Route path="/workouts" component={WorkoutsPage} />
                        </Main>
                </div>
            </Router>

        )
    }
}
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

export default styled(MainPage);
