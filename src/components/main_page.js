import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {ExercisesPageContainer} from '../containers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { styled, useStyles } from './styles';
import {Sidebar, SidebarList} from './sidebar';
import {Logo} from './util';

// TODO
// Change Links to dynamically generated path and text using a map

class MainPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <Sidebar />
                    <Main>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route path="/exercises" component={ExercisesPageContainer} />
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
        <div>
            <main className={classes.content}>
            {props.children}
            </main>
        </div>
    );
}

export default styled(MainPage);
