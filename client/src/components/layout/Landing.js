import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
class Landing extends Component{
  render(){
    return(
      <div className="page-wrap">
      <div className="landing-inner">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="">Two Truths and A Lie</h1>
            <p className="lead">
              {' '}
            </p>
          <img src={require('./Hand.png')} height="200px" />
          <div className="instruction">
            <h4>An app that allows users to play Two Truths And A Lie with strangers.</h4>
            <h6>Create a profile and start following users. Feel free to like, comment, and tell your two truths and one lie.</h6>
          </div>
          <div>
          </div>
            <Link to="/register" className="btn btn-lg btn-primary mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
  }
}
export default Landing;
