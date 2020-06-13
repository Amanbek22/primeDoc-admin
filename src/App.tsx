import React from 'react';
import './App.css';
import {BrowserRouter as Router,  Route, Switch} from "react-router-dom";

type OwnProps = {}
const App: React.FC<OwnProps> = (props) => {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path={'/'}>

                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App
