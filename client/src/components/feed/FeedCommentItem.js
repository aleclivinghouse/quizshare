import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class FeedCommentItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedComment');
    console.log(item);
    let commenter;
    if(this.props.auth.user.id === this.props.item.comment.commenterId){
      commenter = 'You'
    } else {
      commenter = item.comment.name;
    }
    let poster;
      if(this.props.auth.user.id === this.props.item.post.posterId){
        poster = 'Your';
      } else {
        poster = this.props.item.post.name + 's';
      } 
    return(
      <div className="card card-body mb-3 text-center">
        <div className="row">
          <div className="col-md-10">
            <span>{commenter} commented: <h3>{item.comment.text}</h3> on</span>
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

export default connect(mapStateToProps)(FeedCommentItem);
