import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FeedCommentItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedComment');
    console.log(item);
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <span>{item.comment.name} commented: <h3>{item.comment.text}</h3> on</span>
            <Link to={`/post/${item.post._id}`}> {item.post.name}s Post</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedCommentItem;
