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
            <h1 className="display-3 mb-4">Two Truths and A Lie</h1>
            <p className="lead">
              {' '}
            </p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
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
