import React, {Component} from 'react';


class FeedCommentItem extends Component{
  render(){
    const {item} = this.props;
    console.log('this is the item in the FeedComment');
    console.log(item);
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
                <p>This is a feed Item</p>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedCommentItem;
