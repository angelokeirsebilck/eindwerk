import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './components/Nav/NavBar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Page404 from './pages/Page404';
import { API, TOKEN } from "./config/API";
import Login from './pages/Login';
import { connect } from 'react-redux';
import { loginAction, getUserData } from './redux/actions/authActions';

class App extends Component {

  componentDidMount() {
    if (TOKEN) {
      // Als er een token is (uit local storage) dan gaan we de gebruikersgevens ophalen
      this.props.getUserData();
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/" exact component={Home}></Route>
            <Route path="/" component={Page404}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
      user: state.auth.user
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    loginAction: (response) => dispatch(loginAction(response)),
    getUserData: () => dispatch(getUserData())
  }
}

export default connect(MapStateToProps,MapDispatchToProps)(App);
