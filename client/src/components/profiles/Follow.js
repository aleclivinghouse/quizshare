import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getFollowers} from '../../actions/followActions';
import {getFollowing} from '../../actions/followActions';
import Collapsible from 'react-collapsible';
import './main.css';

class Follow extends Component{
  componentDidMount(){
    this.props.getFollowers(this.props.theId);
    this.props.getFollowing(this.props.theId);
  }



  render(){
  // console.log('here are the props');
  //   console.log(this.props);
    const followers = (this.props.follow[this.props.theId] !== undefined) ? this.props.follow[this.props.theId]: [];
    console.log('here are the followers');
    console.log(followers);

    const following = (this.props.follow[this.props.theId+'-following'] !== undefined) ? this.props.follow[this.props.theId+'-following']: [];
    console.log(following);
    return(
       <Collapsible trigger="See Follows" className="btn btn-secondary">
      <div>
        <h6>Followers</h6>
      <ul className="list">
      {followers.map(p => <div><li key={p._id}>{p.follower.name}</li>
        </div>
       )}
      </ul>
      <h6>Following</h6>
      <ul className="list">
        {following.map(p => <div><li key={p._id}>{p.following.name}</li>
          </div>
      )}
      </ul>
      </div>
    </Collapsible>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  follow: state.follow
})
export default connect(mapStateToProps, {getFollowers, getFollowing})(Follow);
