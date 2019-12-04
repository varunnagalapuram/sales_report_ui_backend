import './App.css';
import InstructorApp from './component/InstructorApp';
import GraphComponent from './component/GraphComponent'
import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import GraphMarketComponent from './component/GraphMarketComponent';
import GraphApp from './component/GraphApp';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
      <switch>
                <Route path="/" exact component={InstructorApp} />
                <Route path="/stores" exact component={InstructorApp} />
                <Route path="/graph" component={GraphApp} />
               
        </switch>
      </div>
      </Router>
    );
  }
}

export default App;