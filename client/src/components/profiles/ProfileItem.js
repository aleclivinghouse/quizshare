import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import {getFollowers} from '../../actions/followActions';
import {getFollowing} from '../../actions/followActions';
import {getPostsFromUser} from '../../actions/postActions';
import {setFollow} from '../../actions/followActions';
import {unFollow} from '../../actions/followActions';
import Follow from './Follow';
import './cards.css'

class ProfileItem extends Component {
  componentDidMount(){
    this.props.getFollowers(this.props.profile.user._id);
    this.props.getPostsFromUser(this.props.profile.user._id);
  }

  onFollowClick(){
    this.props.setFollow(this.props.profile.user._id, this.props.auth.user.id, ()=>{
      this.props.getFollowers(this.props.profile.user._id);
      this.props.getFollowing(this.props.auth.user.id);
    });
  }

  onUnFollowClick(){
    this.props.unFollow(this.props.profile.user._id, this.props.auth.user.id, () => {
      this.props.getFollowers(this.props.profile.user._id);
      this.props.getFollowing(this.props.auth.user.id);
    });
  }
  render(){
    const profile = this.props.profile;
    const posts = (this.props.post[this.props.profile.user._id] !== undefined)
    ? this.props.post[this.props.profile.user._id]: [];
    let questionsArray = [];


    const findAlreadyFollowed = (followers) => {
        for(let follower of followers){
        if(follower.follower._id === this.props.auth.user.id){
          return true;
         }
        }
        return false;
      };
    const followers = (this.props.follow[this.props.profile.user._id+'-followers'] !== undefined) ? this.props.follow[this.props.profile.user._id+'-followers']: [];
    console.log('these are the follows');
    console.log(this.props.follow[this.props.profile.user._id+'-followers']);
    const alreadyFollowed = findAlreadyFollowed(followers);
    let followButton;
    if(alreadyFollowed === false && this.props.auth.user.id !== this.props.profile.user._id){
      followButton = (
        <button onClick={this.onFollowClick.bind(this)} className="btn btn-primary">
          Follow
        </button>
      );
    } else if(alreadyFollowed === true && this.props.auth.user.id !== this.props.profile.user._id){
      followButton = (
      <button onClick={this.onUnFollowClick.bind(this)} className="btn btn-primary blue-button">
        UnFollow
      </button>
      );
    } else {
      followButton = '';
    }

    return(
      <div className="card card-body mb-3 text-center">
        <div className="row">
          <div className="col-md-12 top-container">
          <div>
            <div className="follow-button-wrapper mb-3">
              {followButton}
          </div>
            <Follow theId={this.props.profile.user._id}/>
            <h3 className="to-center">{profile.user.name}</h3>
            <p className="to-center">{profile.bio}</p>
          </div>
          </div>

          <ul className="the-list">
         {posts.map((post, index) => (
           <div className="post-card text-center">
             <li>
               <p>{post.q1}</p>
               <p>{post.q2}</p>
               <p>{post.q3}</p>
               <button className="btn btn-primary the-button">
               <Link to={`/post/${post._id}`} className="the-button">Go to Post</Link>
               </button>
             </li>
           </div>
       ))}
       </ul>
        </div>
        <div className="cold-md-4 d-none d-md-block">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
        <h4>Things I like</h4>
        <ul className="list-group text-center skills">
          {profile.skills.map((skill, index) => (
            <li key={index} className="list-group-item">
              <p>
              {skill}
              </p>
            </li>
          ))}
        </ul>
       </div>
        <div className="col-md-2"></div>
       </div>
      </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  follow: state.follow
});

export default connect(mapStateToProps, {getPostsFromUser, setFollow, unFollow, getFollowers, getFollowing})(ProfileItem);
