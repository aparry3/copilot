import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {ExercisesPage} from './exercises'

// TODO
// Change Links to dynamically generated path and text using a map

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <Router>
                <div className="conatiner-fluid main-page">
                    <div className="row">
                        <Sidebar>
                            <Link to="/">Home</Link>
                            <Link to="/exercises">Exercises</Link>
                        </Sidebar>
                        <Main>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route path="/exercises" component={ExercisesPage} />
                        </Main>
                    </div>
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
  return (
    <div className="container content col-sm-10">
        {props.children}
    </div>
  );
}


function Sidebar(props) {
    return (
        <div className="container sidebar col-sm-2">
            <ul> {props.children.map(child => {
                return <li>{child}</li>;
            })}
            </ul>
        </div>
    );
}
