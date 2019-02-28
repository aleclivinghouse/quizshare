import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class FeedPostItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedPost');
    console.log(item);
    let poster;
    let posterAgain;
    if(this.props.auth.user.id === this.props.item.user._id){
       poster = 'you';
       posterAgain = 'Your';
    } else {
      poster = item.user.name;
      posterAgain = item.user.name + 's';
    }
    return (
    <div className="card card-body mb-3">
      <div className="row">
          <div className="col-md-10 text-center">
              <p>{poster} just posted the following Two Truths and A Lie</p>
              <p>{item.q1}</p>
              <p>{item.q2}</p>
              <p>{item.q3}</p>
              <Link to={`/post/${item._id}`}>Go to {posterAgain} Two Truths And A Lie</Link>
          </div>
      </div>
    </div>
   )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(FeedPostItem);
