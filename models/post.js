const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
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

async function createPost(username, bloodType, text, contact){
  try{
    let post = new Post({
      username: username,
      bloodtype: bloodType,
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
