import axios from 'axios';
import {GET_FEED, GET_ERRORS, GET_USER} from './types';

export const getFeed = id => dispatch => {
  axios
  .get(`/api/feed/${id}`)
  .then(res => {
    // console.log('this is where we get the feed');
    // console.log(res.data);
    dispatch({
      type: GET_FEED,
      payload: res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const getUserForLike = id => dispatch => {
  axios
  .get(`/api/users/${id}`)
  .then(res => {
    console.log('this is where we get use rfor like');
    console.log(res.data);
    dispatch({
      type: GET_USER,
      payload: res.data,
      id: id
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}
