import React, { Component } from "react";
import StoreDataService from "./../service/SalesDataService";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class ListStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      message: null
    };
    this.refreshStores = this.refreshStores.bind(this);
    this.deleteStoreClicked = this.deleteStoreClicked.bind(this);
    this.getStoreById = this.getStoreById.bind(this);
    this.updateStoreClicked = this.updateStoreClicked.bind(this);
    //this.graphClicked = this.graphClicked.bind(this)
  }

  componentDidMount() {
    this.refreshStores();
  }

  refreshStores() {
    StoreDataService.retrieveAllStores().then(response => {
      console.log(response);
      this.setState({ stores: response.data });
    });
  }
  getStoreById(id) {
    StoreDataService.retrieveStore(id).then(response => {
      // console.log(response);
      this.setState({ stores: response.data });
    });
  }
  deleteStoreClicked(id) {
    StoreDataService.deleteStore(id).then(response => {
      this.setState({ message: `Delete of Store ${id} Successful` });
      this.refreshStores();
    });
  }
  updateStoreClicked(id) {
    console.log(this.state.stores[id]);
  }
  render() {
    return (
      <div className="container">
        <h3>All Stores</h3>
        {this.state.message && (
          <div class="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table" border="1">
            <thead>
              <tr>
                <th>Store Id</th>
                <th>Dist to Taxi</th>
                <th>Dist to Market</th>
                <th>Dist to Metro</th>
                <th>Area</th>
                <th>Items</th>
                <th>Parking</th>
                <th>Coupon Cateory</th>
                <th>Daily Cust Count</th>
                <th>Store Sales</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stores.map(store => (
                <tr key={store.store_id}>
                  <td>{store.store_id}</td>
                  <td>{store.dist_taxi}</td>
                  <td>{store.dist_market}</td>
                  <td>{store.dist_metro}</td>
                  <td>{store.store_area}</td>
                  <td>{store.items_available}</td>
                  <td>{store.parking}</td>
                  <td>{store.coupon_category}</td>
                  <td>{store.daily_cust_count}</td>
                  <td>{store.store_sales}</td>
                  <td>
                    <Router>
                      <Link to="/update">UPDATE</Link>
                      <Switch>
                        <Route path="/update">
                          <Update
                            func={this.updateStoreClicked}
                            value={store}
                          />
                        </Route>
                      </Switch>
                    </Router>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteStoreClicked(store.store_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Update extends Component {
  constructor(props) {
    super(props);

    //axios.put(`http://localhost:9000/uber/update/${this.props.value.id}`,this.props.value);

    //this.props.func();
  }

  render() {
    return (
      <div>
        <form action="https://4wcmx.csb.app">
          <Router>
            <ul>
              <li>
                <Link to="/update/taxi">TAXI </Link>
              </li>
              <li>
                <Link to="/update/market">MARKET </Link>
              </li>
              <li>
                <Link to="/update/metro">METRO </Link>
              </li>
            </ul>
            {/* <Link to="/pickups">pickups</Link> */}
            <Switch>
              <Route path="/update/taxi">
                <Taxi value={this.props.value} func={this.props.func} />
              </Route>
              <Route path="/update/market">
                <Market value={this.props.value} func={this.props.func} />
              </Route>
              <Route path="/update/metro">
                <Metro value={this.props.value} func={this.props.func} />
              </Route>
            </Switch>
          </Router>
        </form>
      </div>
    );
  }
}
class Taxi extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update = () => {
    let dist_taxi = Number(document.getElementById("pu").value);
    this.props.value.dist_taxi = Number(dist_taxi);
    console.log(this.props.value.store_id);
    //Axios.put(`http://localhost:8080/stores/update/${this.props.value.store_id}`,this.props.value);
    Axios.put(
      `https://sales-report-app.cfapps.io/stores/update/${
        this.props.value.store_id
      }`,
      this.props.value,
      {
        auth: {
          username: "admin",
          password: "adminpassword"
        }
      }
    );
    //Axios.put(`http://localhost:8080/stores/update/${id}`,this.state.stores[id]);

    //this.props.func();
    //Window.reload();
  };
  render() {
    return (
      <div>
        <input type="number" id="pu" placeholder="ENTER TAXI DISTANCE" />
        <button type="submit" onClick={this.update}>
          submit
        </button>
      </div>
    );
  }
}
class Market extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update = () => {
    let dist_market = Number(document.getElementById("pu").value);
    this.props.value.dist_market = Number(dist_market);
    console.log(this.props.value.store_id);
    //Axios.put(`http://localhost:8080/stores/update/${this.props.value.store_id}`,this.props.value);
    Axios.put(
      `https://sales-report-app.cfapps.io/stores/update/${
        this.props.value.store_id
      }`,
      this.props.value,
      {
        auth: {
          username: "admin",
          password: "adminpassword"
        }
      }
    );
    //Axios.put(`http://localhost:8080/stores/update/${id}`,this.state.stores[id]);

    //this.props.func();
    //Window.reload();
  };
  render() {
    return (
      <div>
        <input type="number" id="pu" placeholder="ENTER MARKET DISTANCE" />
        <button type="submit" onClick={this.update}>
          submit
        </button>
      </div>
    );
  }
}
class Metro extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update = () => {
    let dist_metro = Number(document.getElementById("pu").value);
    this.props.value.dist_metro = Number(dist_metro);
    console.log(this.props.value.store_id);
    Axios.put(
      `https://sales-report-app.cfapps.io/stores/update/${
        this.props.value.store_id
      }`,
      this.props.value,
      {
        auth: {
          username: "admin",
          password: "adminpassword"
        }
      }
    );
    //Axios.put(`http://localhost:8080/stores/update/${id}`,this.state.stores[id]);

    //this.props.func();
    //Window.reload();
  };
  render() {
    return (
      <div>
        <input type="number" id="pu" placeholder="ENTER METRO DISTANCE" />
        <button type="submit" onClick={this.update}>
          submit
        </button>
      </div>
    );
  }
}
export default ListStores;
