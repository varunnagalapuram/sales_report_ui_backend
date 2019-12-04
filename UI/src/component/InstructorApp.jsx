import React, { Component } from 'react';
import ListStores from './ListStores';
import GraphComponent from './GraphComponent';
import StoreDataService from './../service/SalesDataService'
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import {Nav, Navbar} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import GraphApp from './GraphApp';

class InstructorApp extends Component {
  constructor(props){
    super(props);
    this.state={
      message:''
    }
    this.changeHandler=this.changeHandler.bind(this);
    this.submitHandler=this.submitHandler.bind(this);
  }
changeHandler = (event) => {
  this.setState({message:event.target.value})
}
submitHandler = (id)=>{
  StoreDataService.retrieveStore(id)
  .then(
    response=>{
      this.state ={
        
      }
    }
  )
}
  render() {
    return (
      <Router>
        <div>
          <h1>Sales Report Application</h1> <br />
          <form>
            <input type='text' onChange={this.changeHandler} value={this.state.message}></input> 
            <button onClick={()=>this.submitHandler(this.state.message)}>Search</button>
          </form>
          <ul>
            <li>
              <Link to="/">Home</Link> </li>
            <li>
              <Link to="/graphs">Graphs</Link> </li>
          </ul>

          <switch>
            <Route exact path="/" ><ListStores /></Route>
            <Route path="/graphs"><GraphApp /> </Route>
          </switch>

        </div>
      </Router>

    )
  }
}

export default InstructorApp