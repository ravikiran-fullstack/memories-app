import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async(req, res) => {
  try{
    const postMessages = await PostMessage.find();
    // console.log(postMessages);
    return res.status(200).json(postMessages)
  }catch(err){
    console.log('error ', err);
    return res.status(404).json({message: err.message})
  }
}

export const createPost = async (req, res) => {
  // console.log('req.body createPost ',req.body);
  const post = req.body;
  const newPost = new PostMessage(post);
  try{
    const result = await newPost.save();
    //console.log('result', result);
    return res.status(201).json(newPost);
  }catch(err){
    console.log(err);
    return res.status(409).json({message: err.message});
  }
}

export const updatePost = async (req, res) => {
  // const postId = req.params.id;
  try{
    const {id: _id} = req.params;
    const post = {...req.body, _id};
    if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).send('No post with that id');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    return res.json(updatedPost);
  }catch(err){
    console.log(err);
  }
}

export const deletePost = async (req, res) => {
  console.log('delete post', req.params);
  try{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).send('No post with that id');
    }

    const deletePost = await PostMessage.findByIdAndDelete(_id);
    if(deletePost){
      return res.json('deleted');
    } else {
      return res.status(404).json('No document with id found');
    }
  } catch(err) {
    console.log(err);
  }
}

export const likePost = async (req, res) => {
  console.log('like post', req.params);
  try{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).send('No post with that id');
    }
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new : true});
    return res.json(updatedPost);
  }catch(err){
    console.error(err)
  }
}
