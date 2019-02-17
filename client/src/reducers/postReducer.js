import {ADD_POST, ADD_LIKE, LIKE_COMMENT, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST, GET_POSTS_FROM_USER} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state=initialState, action){
  switch(action.type){
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
      case GET_POSTS_FROM_USER:
        return {
          ...state,
          [action.id]: action.payload,
          loading: false
        }
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          loading: false
        }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
      case ADD_LIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post._id === action.payload._id){
            post = action.payload;
            return post;
          } else {
            return post;
          }
        })
      }
      case LIKE_COMMENT:
      return {
        ...state,
        post: action.payload,
        posts: state.posts.map(post => {
          if(post._id === action.payload._id){
            post = action.payload;
            return post;
          } else {
            return post;
          }
        })
      }

    default:
    return state;
  }
}
