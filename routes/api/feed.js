const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const generateLike = require('./FeedHelper').generateLike;
const generateComment = require('./FeedHelper').generateComment;
const generateCommentLike = require('./FeedHelper').generateCommentLike;
const generate = require('./FeedHelper').generate;
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Follow = require('../../models/Follow');
const User = require('../../models/User');

// router.get('/:id', (req, res) => {
//   //first get the id of all the followers
//   let map = {};
//   let follows = Follow.find({following: req.params.id});
//
//   for(let follow of follows)
//   console.log(follows);
// })

router.get('/:id', async(req, res)=> {
  let theArray = [];
  let follows = await Follow.find({follower: req.params.id}) //1.
  .populate('following');
    let newArray = [];

    let posts = await Post.find({user: req.params.id})
    .sort({ date: -1 }).populate('user').populate('likes.user').populate('comments.user')
    .populate('comments.likes.user')
    for(let post of posts){
        for(let like of post.likes){
          let newLike = await generateLike(post, like);
          theArray.push(newLike);
        }
        for(let comment of post.comments){
          let newComment = await generateComment(post, comment);
          // theArray.push(newComment);
          let thing = await generate(post, comment);
          // theArray.push(...thing);
        }

      }
    for(let follow of follows){ //3
        let posts = await Post.find({ user: follow.follower._id }).sort({ date: -1 })
        .sort({ date: -1 }).populate('user').populate('likes.user').populate('comments.user')
        .populate('comments.likes')
        // console.log('these are the posts');
        console.log(posts);
        for(let post of posts){
          // theArray.push(post);
            for(let like of post.likes){
              let newLike = await generateLike(post, like);
              // theArray.push(newLike);
            }
            for(let comment of post.comments){
              let newComment = await generateComment(post, comment);
              // theArray.push(newComment);
              let thing = await generate(post, comment);
              // theArray.push(...thing);
            }

          }
    }
  const toSend = theArray.sort((a,b) => {
  return new Date(b.date) - new Date(a.date);
});
    // console.log(theArray);
    // toSend = toSend.slice(0, 10);
    res.json(toSend.slice(0, 20)); //8
});

module.exports = router;
