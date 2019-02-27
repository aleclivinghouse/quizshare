import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFeed} from '../../actions/feedActions';
import FeedLikeItem from './FeedLikeItem';
import FeedCommentItem from './FeedCommentItem';
import FeedCommentLikeItem from './FeedCommentLikeItem';
import FeedPostItem from './FeedPostItem';

class Feed extends Component{
  componentDidMount(){
    this.props.getFeed(this.props.auth.user.id);
  }

  render(){
    console.log('these are the props in feed');
    console.log(this.props);
    return(
      <div className="container">
          <div className="row">
            <div className="col-md-12">
            </div>
            <h1>The feed shows up</h1>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  feed: state.feed
});

export default connect(mapStateToProps, {getFeed})(Feed);


//other users posts have a unique key of q1
//likes have 3 keys: post, like, and date
//comments have 3 keys post, comment, and date
//commentLikes have comment like date and post
/*
let feedContent;
if(feed === null){
  <h4>Loading...</h4>
}else {
  feedContent = feed.map((item) =>{
    if(Object.keys(item).length === 3 && item.hasOwnProperty('like')){
      <FeedLikeItem key={item._id} item={item} />

    } else if(Object.keys(item).length === 3 && item.hasOwnProperty('comment')){
     <FeedCommentItem key={item._id} item={item} />

    } else if(item.hasOwnProperty('likeId')){
     <FeedCommentLikeItem key={item._id} item={item} />

    } else if(item.hasOwnProperty('q1')){
     <FeedPostItem key={item._id} item={item} />
    }
  })
  console.log('this is the feedContent');
  console.log(feedContent);

*/
