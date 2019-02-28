const User = require('../../models/User');
const mongoose = require('mongoose');

const generateLike = (post, like) => {
  console.log('this is the like comming into generate like')
  let map = {};
  let thePost = {};
  let theLike = {};
  thePost.q1 = post.q1;
  thePost.q2 = post.q2;
  thePost.q3 = post.q3;
  thePost._id = post._id;
  thePost.posterId = post.user._id;
  thePost.name = post.user.name;
  console.log(thePost.date);
  map.post = thePost;
  map.like = like;
  map.date = like.date;
  return map;
}

 const generateComment = (post, comment) => {
   // console.log('this is the comment coming into');
   // console.log(comment);
   let map = {};
   let thePost = {};
   let theComment = {};
   theComment.name = comment.name;
   theComment.text = comment.text;
   theComment._id = comment._id;
   theComment.commenterId = comment.user._id;
   thePost.q1 = post.q1;
   thePost.q2 = post.q2;
   thePost.q3 = post.q3;
   thePost._id = post._id;
   thePost.name = post.user.name;
   thePost.posterId = post.user._id;
   map.comment = theComment;
   map.date = comment.date;
   map.post = thePost;
   return map;
 }

 const generateCommentLike = (post, comment, like) =>{
   console.log('this is like user id');
   console.log(like.user);
   let map = {};
   let thePost = {};
   let theComment = {};
   theComment.name = comment.name;
   theComment.text = comment.text;
   theComment._id = comment._id;
   theComment.commenterId = comment.user.id;
   console.log('this is the comment.user.id');
   console.log(comment.user.id);
   thePost.q1 = post.q1;
   thePost.q2 = post.q2;
   thePost.q3 = post.q3;
   thePost._id = post._id;
   thePost.name = post.user.name;
   thePost.posterId = post.user._id;
   map.comment = theComment;
   map.likeId = like.user;
   map.date = like.date;
   map.post = thePost;
   return map;
 }

 const generate = (post, comment) => {
   let newArray = [];
     for(let like of comment.likes){
       let newCommentLike = generateCommentLike(post, comment, like);
       // console.log('this is new Comment Like');
       // console.log(newCommentLike);
       newArray.push(newCommentLike);
     }
   return newArray;
 }



module.exports = {
  generateLike,
  generateComment,
  generateCommentLike,
  generate
}
