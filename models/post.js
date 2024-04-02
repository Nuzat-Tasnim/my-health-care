const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    required: true
  },
  bloodtype: {
    type: String,
    required: true
  },
  text: {
    type: String,
  },
  contact: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
  
}));

async function createPost(userid, username, bloodType, text, contact){
  try{
    let post = new Post({
      userid: userid,
      username: username,
      bloodtype: bloodType,
      text: text,
      contact: contact,
      date: new Date().toLocaleDateString()
    });
    post = await post.save();
    return post;
  }
  catch(err){ return null; }
}

async function getPosts() {
  let posts = await Post.find().sort({ "date": 'descending' });
  return posts;
}

async function getPost(postId){
  let post = await Post.findById(postId);
  return post;
}

async function removePost(post){
  let result = await post.remove();
  return result;
}


exports.Post = Post; 
exports.createPost = createPost;
exports.getPost = getPost;
exports.getPosts = getPosts;
exports.removePost = removePost;