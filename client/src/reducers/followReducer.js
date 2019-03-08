import isEmpty from '../validation/is-empty';
import { SET_FOLLOW, GET_FOLLOWERS, UN_FOLLOW, GET_FOLLOWING} from '../actions/types';

const initialState = {
  follows: [],
  followers: [],
  following: []
};

export default function(state = initialState, action){
  switch(action.type){
    case SET_FOLLOW:
    return {
      ...state,
      [action.id+'-followers']: [action.payload, ...state[action.id+'-followers']],
      [action.id+'-following']: [action.payload, ...state[action.id+'-following']]
    }
    case UN_FOLLOW:
    return {
      ...state,
      [action.id+'-followers']: state[action.id+'-followers'].filter((follow) =>{
        follow.follower._id !== action.payload
      })
    }
    case GET_FOLLOWERS:
    return {
      ...state,
      [action.id+'-followers']: action.payload
    }
    case GET_FOLLOWING:
    return {
      ...state,
      [action.id+'-following']: action.payload
    }

    default:
      return state;
  }
}

//
