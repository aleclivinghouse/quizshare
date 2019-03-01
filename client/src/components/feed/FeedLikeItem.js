import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class FeedLikeItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedLike');
    console.log(item);
    let liker;
    if(this.props.auth.user.id === this.props.item.like.user._id){
      liker = 'You';
    } else {
      liker = item.like.user.name;
    }
    let poster;
    if(this.props.auth.user.id === this.props.item.post.posterId){
      poster = 'Your';
    } else {
      poster = item.post.name + 's';
    }
    return(
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-12 text-center">
          <span>{liker} liked {poster} post</span>
          <Link to={`/post/${item.post._id}`}> {poster} Post</Link>
        </div>
      </div>
    </div>
   )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FeedLikeItem);
