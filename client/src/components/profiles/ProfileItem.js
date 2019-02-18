import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import {getPostsFromUser} from '../../actions/postActions';
import {setFollow} from '../../actions/followActions';
import Follow from './Follow';
import './cards.css'

class ProfileItem extends Component {
  componentDidMount(){
    this.props.getPostsFromUser(this.props.profile.user._id);
  }

  onFollowClick(){
    this.props.setFollow(this.props.profile.user._id, this.props.auth.user.id)
  }
  render(){
    const profile = this.props.profile;
    const posts = (this.props.post[this.props.profile.user._id] !== undefined)
    ? this.props.post[this.props.profile.user._id]: [];
    let questionsArray = [];
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8 top-container">
              <Follow theId={this.props.profile.user._id}/>
              <h3>{profile.user.name}</h3>
              <p>{profile.bio}</p>
          </div>
          <div>
            <button onClick={this.onFollowClick.bind(this)} className="btn-info">
              Follow
            </button>
          </div>
          <ul>
         {posts.map((post, index) => (
           <div className="post-card">
             <li>
               <p>{post.q1}</p>
               <p>{post.q2}</p>
               <p>{post.q3}</p>
               <button className="btn btn-info">
               <Link to={`/post/${post._id}`}>Go to Post</Link>
               </button>
             </li>
           </div>
       ))}
       </ul>
        </div>
        <div className="cold-md-4 d-none d-md-block">
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
      </div>
    )
  }
}
const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {getPostsFromUser, setFollow})(ProfileItem);
