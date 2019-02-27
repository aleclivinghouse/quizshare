const generateLike = (post, like) => {
  let map = {};
  let thePost = {};
  thePost.q1 = post.q1;
  thePost.q2 = post.q2;
  thePost.q3 = post.q3;
  thePost._id = post._id;
  thePost.name = post.user.name;
  console.log(thePost.date);
  map.post = thePost;
  map.like = like;
  map.date = like.date;
  return map;
}

 const generateComment = (post, comment) => {
   let map = {};
   let thePost = {};
   let theComment = {};
   theComment.name = comment.name;
   theComment.text = comment.text;
   theComment._id = comment._id;
   thePost.q1 = post.q1;
   thePost.q2 = post.q2;
   thePost.q3 = post.q3;
   thePost._id = post._id;
   thePost.name = post.user.name;
   map.comment = theComment;
   map.date = comment.date;
   map.post = thePost;
   return map;
 }

 const generateCommentLike = (post, comment, like) =>{
   let map = {};
   let thePost = {};
   let theComment = {};
   theComment.name = comment.name;
   theComment.text = comment.text;
   theComment._id = comment._id;
   thePost.q1 = post.q1;
   thePost.q2 = post.q2;
   thePost.q3 = post.q3;
   thePost._id = post._id;
   thePost.name = post.user.name;
   map.comment = theComment;
   map.like = like.user.name;
   map.date = like.date;
   map.post = thePost;
   return map;
 }

 const generate = (post, comment) => {
   let newArray = [];
     for(let like of comment.likes){
       console.log('post');
       console.log(post);
       let newCommentLike = generateCommentLike(post, comment, like);
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
