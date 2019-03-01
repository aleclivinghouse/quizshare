import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getFollowers} from '../../actions/followActions';
import {getFollowing} from '../../actions/followActions';
import Collapsible from 'react-collapsible';
import Modal from 'react-modal';
import './main.css';

class Follow extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount(){
    this.props.getFollowers(this.props.theId);
    this.props.getFollowing(this.props.theId);
  }
  openModal() {
  this.setState({modalIsOpen: true});
}

closeModal() {
  this.setState({modalIsOpen: false});
}



  render(){
    console.log('follow in the follow compoenent');
    console.log(this.props.follow);
    const followers = (this.props.follow[this.props.theId+'-followers'] !== undefined) ? this.props.follow[this.props.theId+'-followers']: [];
    const following = (this.props.follow[this.props.theId+'-following'] !== undefined) ? this.props.follow[this.props.theId+'-following']: [];
    return(
      <div>
      <button className="btn yellow-btn" onClick={this.openModal}>See Follows</button>
       <Modal trigger="See Follows" className="btn yellow-btn mb-3" isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}>
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
    </Modal>
   </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  follow: state.follow
})
export default connect(mapStateToProps, {getFollowers, getFollowing})(Follow);
