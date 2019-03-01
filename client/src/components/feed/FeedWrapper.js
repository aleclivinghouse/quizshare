import React, {Component} from 'react';
import {connect} from 'react-redux';
import Feed from './Feed';
class FeedWrapper extends Component{
  render(){
    return(
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Feed />
            </div>
          </div>
      </div>
    )
  }
}

export default FeedWrapper;
