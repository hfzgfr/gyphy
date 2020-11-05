import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Gif from './Gif';
import Random from './Components/Random';
import Home from './Images/Home.svg'
import Mood from './Images/Mood.svg'

function App() {
  return (
    <div className="App">
      <Router>
          <Link to="/">
            <img className="svg-icon" src={Home} alt="Home"/>
          </Link> {' '}
          <Link to="/random">
            <img className="svg-icon" src={Mood} alt="Mood"/>
          </Link>
        <Switch>
          {/* <Gif /> */}
          <Route path='/' exact component={Gif} />
          <Route path='/random' component={Random} />
        </Switch>
      </Router>
    {/* <Random /> */}
    </div>
  );
}

export default App;
