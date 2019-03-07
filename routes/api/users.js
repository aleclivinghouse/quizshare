const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const path = require('path');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//stuff here


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
});

router.post('/register', (req, res) => {
  const { errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email })
    .then(user => {
      if(user){
        return res.status(400).json({email: 'Email Already Exists'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt)=>{
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      } //else end
    });
});

router.post('/login', (req, res)=>{
  const { errors, isValid } = validateLoginInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const email = req.body.email;
  const password = req.body.password;
  console.log('this is the email ' + email);
  console.log('this is the password ' + password);
  User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json({email: 'User email not found'});
      }
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(isMatch){
          const payload = { id: user.id, name: user.name, avatar: user.avatar} //Create jwt payload
          jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          });
        } else {
          return res.status(400).json({password: 'Pasword inccorect'})
        }
      });
    });
})

// router.put('/addFollower/:followingId/:followerId', (req, res) => {
//   //add follower
//   User.findByIdAndUpdate(req.params.followingId, {$push: {followers: req.params.followerId}}, {new: true})
//   .populate('following')
//   .populate('followers')
//   .exec((err, result) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       })
//     }
//     res.json(result)
//   })
// });
// //


//.populate
//whenever you need it
//get all the ones where the user is following or followed
// router.put('/addFollowing/:followingId/:followerId', (req, res) => {
//   //add following
//   //first make sure it does not already exist
//   //then create it
//
//   User.findByIdAndUpdate(req.params.followerId, {$push: {following: req.params.followingId}}, (err, result))
//     .then((err, result) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       })
//     }
//     res.json(result);
//   });


router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=> {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
