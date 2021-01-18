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
    await newPost.save();
    return res.status(201).json(newPost);
  }catch(err){
    console.log(err.message);
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

