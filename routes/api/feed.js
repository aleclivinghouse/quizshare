const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
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

router.get('/others/:id', async(req, res)=> {
  let theArray = [];
  let follows = await Follow.find({follower: req.params.id}) //1.
  .populate('following');
    let newArray = [];
    for(let follow of follows){ //3
        let post = await Post.find({ user: follow.following.id }).sort({ date: -1 });
        let following = await Follow.find({following: follow.following.id}).sort({ date: -1 });
        let follower = await Follow.find({follower: follow.following.id}).sort({ date: -1 });
        theArray.push(post);
        theArray.push(following);
        theArray.push(follower);
    }
    res.json(theArray); //8
});

router.get('/own/:id', async(req, res) => {
  let posts = await Post.find({user: req.params.id})
  .sort({ date: -1 })
  .populate('user')
  .populate('likes.user')
  .populate('comments.user')
  res.json(posts);
});

module.exports = router;
