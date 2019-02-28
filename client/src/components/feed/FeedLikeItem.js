import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FeedLikeItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedLike');
    console.log(item);
    return(
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-10 text-center">
          <span>{item.like.user.name} liked {item.post.name}s post</span>
          <Link to={`/post/${item.post._id}`}> {item.post.name}s Post</Link>
        </div>
      </div>
    </div>
   )
  }
}

export default FeedLikeItem;
