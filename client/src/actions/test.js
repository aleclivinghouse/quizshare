let query = Group.find().or([
  {$and: [ {mondayStart: {gte: 6}}, {mondayEnd:  {lte: 8}}] },
  {$and: [ {tuesdayStart: {gte: 9}}, {tuesdayEnd: {lte:13}}] },
  {$and: [ {wednesdayStart: {gte: 9}}, {wednesdayEnd: {lte: 12}}]



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  owner: {type: mongoose.Schema.ObjectId, ref: 'users'},
  subject: String,
  date: {type: Date, default: Date.now},
  mondayStart: Number,
  mondayEnd: Number,
  tuesdayStart: Number,
  tuesdayEnd: Number,
  wednesdayStart: Number,
  wednesdayEnd: Number
});

module.exports = Group = mongoose.model('groups', GroupSchema);


let query = Group.find({
  subject: '/chemistry/',
  $or: [
    {$and: [ {mondayStart: {gte: 6}}, {mondayEnd:  {lte: 8}}] },
    {$and: [ {tuesdayStart: {gte: 9}}, {tuesdayEnd: {lte:13}}] },
    {$and: [ {wednesdayStart: {gte: 9}}, {wednesdayEnd: {lte: 12}}
  ]
})
