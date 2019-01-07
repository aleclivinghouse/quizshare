import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';
import ProfileActions from './ProfileActions';


class Dashboard extends Component{
  componentDidMount(){
    this.props.getCurrentProfile();
  }
  onDeleteClick(e){
    this.props.deleteAcount();
  }
  render(){
    const user = this.props.auth.user;
    const profile = this.props.profile.profile;
    console.log('below is the profile');
    console.log(profile);
    const loading = this.props.profile.loading;
    let dashboardContent;
    if(profile===null || loading){
      dashboardContent = <h4>Loading...</h4>
    } else {
      dashboardContent = <h1>Hello</h1>
    }
    console.log('below is the profile again');
    console.log(profile);
    if(profile !== null){
      dashboardContent = (
        <div>
          <p className="lead text-muted"><Link to={`/dashboard`}>Welcome {user.name} </Link></p>
          <div style={{marginBottom: '60px'}} />
          <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account-0</button>
          <ProfileActions />
        </div>
      );
    } else {
      //USER is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile</Link>
        </div>
      );
      }
    return(
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4">
                {dashboardContent}
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

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
