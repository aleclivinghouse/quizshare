import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike } from '../../actions/postActions';
import Modal from 'react-modal';

class PostItem extends Component {
  constructor(props){
    super(props);
    this.state = {
     message: '',
     modalIsOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onGuessOne = this.onGuessOne.bind(this);
    this.onGuessTwo = this.onGuessTwo.bind(this);
    this.onGuessThree = this.onGuessThree.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this)
  }
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  openModal() {
  this.setState({modalIsOpen: true});
}

// afterOpenModal() {
//   // references are now sync'd and can be accessed.
//   this.subtitle.style.color = '#f00';
// }

closeModal() {
  this.setState({modalIsOpen: false});
}

  onGuessOne(){
    this.setState({modalIsOpen: true});
    if(this.props.post.a1 === 'Truth'){
      this.state.message = 'You guessed wrong';
    } else {
      this.state.message ='You guessed right';
    }
  }

  onGuessTwo(){
     this.setState({modalIsOpen: true});
    if(this.props.post.a2 === 'Truth'){
      this.state.message = 'You guessed wrong';
    }else {
      this.state.message='You guessed right';
    }
  }
  onGuessThree(){
     this.setState({modalIsOpen: true});
    if(this.props.post.a3 === 'Truth'){
      this.state.message ='You guessed wrong';
    } else {
      this.state.message = 'You guessed right';
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    console.log('this is the posts likes');
    console.log(post.likes);

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <br />
            <p className="text-center">{post.name}</p>
              <p className="text-center">{post.q1}</p>
                <button onClick={this.onGuessOne} className="btn btn-light mr-1">Guess One</button>
                  <p className="text-center">{post.q2}</p>
                  <button onClick={this.onGuessTwo} className="btn btn-light mr-1">Guess Two</button>
                  <p className="text-center">{post.q3}</p>
                  <button onClick={this.onGuessThree} className="btn btn-light mr-1">Guess Three</button>
          </div>
          <div class="modal-wrapper">
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
              >
              <button onClick={this.closeModal}>close</button>
              <div>{this.state.message}</div>
            </Modal>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                View Quiz
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike })(
  PostItem
);
