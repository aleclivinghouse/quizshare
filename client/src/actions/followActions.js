import axios from 'axios';
import {SET_FOLLOW, GET_ERRORS, GET_FOLLOWERS, GET_FOLLOWING, UN_FOLLOW} from './types';


export const setFollow = (followingId, followerId, cb) => dispatch => {
  axios
    .post(`/api/follow/${followingId}/${followerId}`)
     .then(res =>
      cb()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err

      })
    );
}
export const unFollow = (followingId, followerId, cb) => dispatch => {
  axios
    .delete(`/api/follow/unfollow/${followingId}/${followerId}`)
    .then(res =>
      cb()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
}

export const getFollowers = id => dispatch => {
  axios
    .get(`/api/follow/followers/${id}`)
    .then(res => {
      dispatch({
        type: GET_FOLLOWERS,
        payload: res.data,
        id: id
      })
     }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getFollowing = id => dispatch => {
  axios
    .get(`/api/follow/following/${id}`)
    .then(res =>
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data,
        id: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
