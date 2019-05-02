import axios from 'axios';
import {GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
   axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
}

export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
   axios.get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
}

//create profile
export const createProfile = (profileData, history) => dispatch => {
   axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This cannot be undone!')){
    axios
      .delete('/api/profile')
      .then(res => ({
        type: SET_CURRENT_USER,
        payload: {}
      })
    ).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
}

export const getProfiles = () => dispatch => {
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: null
    })
  );
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
