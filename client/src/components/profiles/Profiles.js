
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import {getPostsFromUser} from '../../actions/postActions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <h4>Loading...</h4>
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile) => {
          console.log('this is the profile user');
            return<ProfileItem key={profile._id} profile={profile} />
        });
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Two Truths and A Lie</h1>
              <p className="lead text-center">
                Play two truths and a lie with strangers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
