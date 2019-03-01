import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserForLike} from '../../actions/feedActions';


class FeedCommentLikeItem extends Component{
  componentDidMount(){
    this.props.getUserForLike(this.props.item.likeId);
  }

  render(){
    const {item} = this.props;
    console.log('this is the item comment');
    console.log(this.props.item);

    const liker = (this.props.feed[this.props.item.likeId+'-user'] !== undefined) ? this.props.feed[this.props.item.likeId+'-user']: [];
    let commenter;
    let theLiker;
    let poster;
    if(liker === this.props.auth.user.id){
       theLiker = 'You'
    } else {
      theLiker = liker.name;
    }
    if(item.comment.commenterId === this.props.auth.user.id){
      commenter = 'Your';
    } else {
      commenter = item.comment.name;
    }
    if(item.post.posterId === this.props.auth.user.id){
      poster = 'Your';
    } else {
      poster = item.post.name;
    }

    return (
    <div className="card card-body mb-3">
      <div className="row">
         <div className="col-md-12 text-center">
           <span>{liker.name} liked {commenter}s comment on {poster} Two Truths and One Lie: </span>
           <p>{item.comment.text}</p>
           <Link to={`/post/${item.post._id}`}>Go to {poster} Two Truths And A Lie</Link>
         </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  feed: state.feed,
  auth: state.auth
})

export default connect(mapStateToProps, {getUserForLike})(FeedCommentLikeItem);
