import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addPost } from '../../actions/postActions';
import './css.css';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: '',
      a1: '',
      q2: '',
      a2: '',
      q3: '',
      a3: '',
      errors: {},
      errorLieCount: '',
      textError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    let lieCount = 0;
    if (this.state.a1 === "Lie"){
      lieCount++;
    }
    if (this.state.a2 === "Lie"){
      lieCount++;
    }
    if (this.state.a3 === "Lie"){
      lieCount++;
    }
    if(lieCount !== 1){
      this.setState({errorLieCount: 'There must be two truths and a lie'})
    } else if(this.state.q1.length < 5 || this.state.q2.length < 5 || this.state.q3.length < 5){
      this.setState({textError: 'Input must be five characters long'})
    } else  {
    const newPost = {
      name: this.state.name,
      q1: this.state.q1,
      a1: this.state.a1,
      q2: this.state.q2,
      a2: this.state.a2,
      q3: this.state.q3,
      a3: this.state.a3,
      name: user.name
    };
    for(let item in newPost){
      if(newPost[item] === ''){
        newPost[item] = 'Truth'
      }
    }
    console.log('this is new post');
    console.log(newPost);
    this.props.addPost(newPost);
    this.setState({ text: '' });
  }
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const options = [
    { label: 'Truth', value: 'Truth' },
    { label: 'Lie', value: 'Lie' },
  ];

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Question One"
                  name="q1"
                  value={this.state.q1}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <SelectListGroup
                  placeholder="Answer One"
                  name="a1"
                  value={this.state.a1}
                  onChange={this.onChange}
                  options={options}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Question Two"
                  name="q2"
                  value={this.state.q2}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <SelectListGroup
                  placeholder="Answer Two"
                  name="a2"
                  value={this.state.a2}
                  onChange={this.onChange}
                  options={options}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Question Three"
                  name="q3"
                  value={this.state.q3}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <SelectListGroup
                  placeholder="Answer Three"
                  name="a3"
                  value={this.state.a3}
                  onChange={this.onChange}
                  options={options}
                  />
              </div>
                <p className="lieError">{this.state.errorLieCount}</p>
                <p className="lieError">{this.state.textError}</p>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
