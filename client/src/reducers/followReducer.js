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
      [action.id]: [action.payload, ...state[action.id]]
    }
    case UN_FOLLOW:
    return {
      ...state,
      [action.id]: [action.payload, ...state[action.id]]
    }
    case GET_FOLLOWERS:
    console.log(action.payload);
    return {
      ...state,
      [action.id]: action.payload
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
