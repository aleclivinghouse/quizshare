import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { deleteComment, likeComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  onLikeComment(postId, commentId) {
    console.log('button fired on the client');
    this.props.likeComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    console.log('these are the props in comment');
    console.log(this.props)

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />

              </button>
            ) : null}
            <button
              onClick={this.onLikeComment.bind(this, postId, comment._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className='fas fa-thumbs-up'  />
              <span className="badge badge-light">{comment.likes.length}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment, likeComment })(CommentItem);
  // <span className="badge badge-light">{comment.likes.length}</span>
