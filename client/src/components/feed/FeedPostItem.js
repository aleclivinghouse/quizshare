import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FeedPostItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedPost');
    console.log(item);
    return (
    <div className="card card-body mb-3">
      <div className="row">
          <div className="col-md-10 text-center">
              <p>{item.name} just posted the following Two Truths and A Lie</p>
              <p>{item.q1}</p>
              <p>{item.q2}</p>
              <p>{item.q3}</p>
              <Link to={`/post/${item._id}`}>Go to {item.name}s Two Truths And A Lie</Link>
          </div>
      </div>
    </div>
   )
  }
}

export default FeedPostItem;
