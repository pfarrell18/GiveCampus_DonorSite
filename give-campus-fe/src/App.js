import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

//Compontents
import Nav from "./Components/Nav"
import Donation from "./Components/Donation"
import Pledge from "./Components/Pledge"
import SchoolPledges from "./Components/SchoolPledges"
import SinglePledge from "./Components/SinglePledge"

function App() {
  return (
  <Router>
    <Nav/>
    <Switch>
      <Route path="/donate" component ={Donation}/>
      <Route path="/pledge" component ={Pledge}/>
      <Route path="/schoolpledges" component ={SchoolPledges}/>
      <Route path="/singlepledge" component ={SinglePledge}/>
    </Switch>
  </Router>
  )
}

export default App;
