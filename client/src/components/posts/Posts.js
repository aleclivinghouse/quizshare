import React, {Component} from 'react';
import PostForm from './PostForm';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/postActions';
import PostItemForList from './PostItemForList';
import PostFeed from './PostFeed';
class Posts extends Component{
  componentDidMount(){
    this.props.getPosts();
  }
  render(){
    const { posts, loading} = this.props.post;
    let postContent;
    if(posts === null || loading){
      <h4>Loading...</h4>
    }else {
      postContent = <PostFeed posts={posts} />
    }
    return(
      <div className="container">
          <div className="row">
            <div className="col-md-12">
                <PostForm />
                {postContent}
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
