import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      skills: '',
      errors: {},
      bio: ''
    };
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

onSubmit(e){
  e.preventDefault();
  const profileData = {
    bio: this.state.bio,
    skills: this.state.skills,
    subject: this.state.subject
  };
  console.log('below is the state after submission');
  console.log(this.state);
  this.props.createProfile(profileData, this.props.history);

}

onChange(e){
  this.setState({[e.target.name]: e.target.value});
}

  render(){
    const errors = this.state.errors;
    const options = [
      {label: 'Math', value: 'Math'},
      {label: 'Sience', value: 'Science'},
      {label: 'English', value: 'English'},
      {label: 'History', value: 'History'},
      {label: 'Pop Culture', value: 'Pop Culture'}
    ];

    return(
      <div className="create-profile">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
            <TextFieldGroup
            placeholder="* Skills"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            info="Please use comma separated values (eg.
              History, English, Music"
          />
          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error = {errors.bio}
            info="write a short bio"
            />
          <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile))
