import {GET_FEED, GET_ERRORS, GET_USER} from '../actions/types';

const initialState = {
  feed: []
};

export default function(state = initialState, action){
    switch(action.type){
      case GET_FEED:
      return {
        ...state,
        feed: action.payload
      }
      case GET_USER:
      return {
        ...state,
        [action.id+'-user']: action.payload
      }
      default:
        return state;
    }
}
