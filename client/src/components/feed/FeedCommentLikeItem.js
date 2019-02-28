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
    console.log(this.props.item.post._id);
        const liker = (this.props.feed[this.props.item.likeId+'-user'] !== undefined) ? this.props.feed[this.props.item.likeId+'-user']: [];
        console.log('this is the liker');
        console.log(liker);
    return (
    <div className="card card-body mb-3 text-center">
      <div className="row">
         <div className="col-md-10">
           <span>{liker.name} liked {item.comment.name}s comment on {item.post.name}s Two Truths and One Lie: </span>
           <p>{item.comment.text}</p>
           <Link to={`/post/${item.post._id}`}>Go to {item.post.name}s Two Truths And A Lie</Link>
         </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  feed: state.feed
})

export default connect(mapStateToProps, {getUserForLike})(FeedCommentLikeItem);
