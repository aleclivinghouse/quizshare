import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/privateRoute';
import {createStore, applyMiddleware} from 'redux';
import { setCurrentUser, logoutUser } from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Feed from './components/feed/Feed';
import './App.css';

if(localStorage.jwtToken){
  //set the auth oken header auth
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div>
        <Navbar />
        <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
            <Switch>
            <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
          <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/post/:id" component={Post} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/feed/:id" component={Feed} />
          </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>
    );
  }
}

export default App;
