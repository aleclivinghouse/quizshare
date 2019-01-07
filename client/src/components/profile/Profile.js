import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProfileByHandle} from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render(){
    const profile = this.props.profile;
    console.log('these are the props');
    console.log(this.props);
    return(
      <div className="card card-body bg-light mb-3">

      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
