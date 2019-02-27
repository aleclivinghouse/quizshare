import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserForLike} from '../../actions/feedActions';


class FeedCommentLikeItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedCommentLike');
    console.log(item);
    return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <div className="col-md-10">
              <p>This is a feed Item</p>
          </div>
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
