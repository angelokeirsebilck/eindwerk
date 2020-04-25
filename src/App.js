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
import { loginAction, setUserData } from './redux/actions/authActions';
import PostDetails from './pages/PostDetails';
import AddPost from './pages/AddPost';
import Profile from './pages/Profile';
import classes from './App.module.css';

class App extends Component {

  componentDidMount() {
    if (TOKEN) {
      // Als er een token is (uit local storage) dan gaan we de gebruikersgevens ophalen
      this.props.setUserData();
    }
  }

  render() {
    return (
      <div className={classes.App}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/posts/:post" component={PostDetails}></Route>
            <Route path="/addpost" component={AddPost}></Route>
            <Route path="/profile/:userId" component={Profile}></Route>
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
    setUserData: () => dispatch(setUserData())
  }
}

export default connect(MapStateToProps,MapDispatchToProps)(App);
