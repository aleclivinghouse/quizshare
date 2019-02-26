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
   thePost.q1 = post.q1;
   thePost.q2 = post.q2;
   thePost.q3 = post.q3;
   thePost._id = post._id;
   thePost.name = post.user.name;
   map.comment = comment;
   map.date = comment.date;
   map.post = thePost;
   return map;
 }


module.exports = {
  generateLike
}
