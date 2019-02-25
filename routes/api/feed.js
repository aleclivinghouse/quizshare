const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = Promise;
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

router.get('/others/:id', (req, res)=> {
  let theArray = [];
  Follow.find({follower: req.params.id}) //1.
  .populate('following')
  .then(follows => { //2.
    let newArray = [];
    for(let follow of follows){ //3
      let promise = Promise.all([ //4
        Post.find({ user: follow.following.id }).sort({ date: -1 }),
        Follow.find({following: follow.following.id}).sort({ date: -1 }),
        Follow.find({follower: follow.following.id}).sort({ date: -1 }),
      ])
        .then(([post, following, follower]) => { //5
          console.log(post,'6'); //6
          theArray.push(post);
          theArray.push(following);
          theArray.push(follower);
        });
        newArray.push(promise);
    }
    Promise.all(newArray).then(arr => {
        res.json(theArray); //8
    });
  });
});

router.get('/own/:id', (req, res) => {
  Post.find({user: req.params.id})
  .sort({ date: -1 })
  .populate({path: 'likes',  populate: { path: 'likes' }})
  .then(posts => res.json(posts))
});

module.exports = router;
