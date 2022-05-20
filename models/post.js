const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  bloodType: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 4
  },
  text: {
    type: String,
    default: false
  },
  contact: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  date: {
    type: Date
  }
  
}));

// function validatePost(post) {
//   const schema = {
//     username: Joi.string().min(3).max(50).required(),
//     bloodType: Joi.string().min(2).maxlength(4).required(),
//     text: Joi.string(),
//     contact: Joi.string().min(5).max(50).required()
//   };

//   return Joi.validatePost(post, schema);
// }

async function createPost(username, bloodType, text, contact){
  try{
    let post = new Post({
      username: username,
      bloodType: bloodType,
      text: text,
      contact: contact,
      date: new Date()
    });
    post = await post.save();
    return post;
  }
  catch(err){ return null; }
}

async function getPosts() {
  let posts = await Post.find().sort("date");
  return posts;
}

async function getPost(postId){
  let post = await Post.findById(postId);
  return post;
}


exports.Post = Post; 
exports.createPost = createPost;
exports.getPost = getPost;
exports.getPosts = getPosts;
