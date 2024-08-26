const Blog=require("../Models/blogModel")
const User = require('../Models/userModel');

// Get all Blogs
const getPost=async (req,res) => {
    try {
        const posts = await Blog.find(); 
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
}

// Get Blogs by ID
const getPostById=async (req,res) => {
    try {
        const post = await Blog.findById(req.params.id); 
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
}

const createPost = async (req, res) => {
  try {
      const { title, description } = req.body;
      const id = req.user.id; // Extract the user ID from the request object
           console.log(req.body, )
           const name = await User.findById(id); 

const user=name.name
      // Create a new blog post
      const newPost = await Blog.create({ user, title, description });

      res.status(201).json(newPost);
  } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update an existing post by ID
const updatePostById = async (req, res) => {
    try {
        const { title, description } = req.body; 
        const updatedPost = await Blog.findByIdAndUpdate(
            req.params.id,           
            { title, description },   
            { new: true }            
        );
        
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
      const deletedPost = await Blog.findByIdAndDelete(req.params.id);
      if (deletedPost) {
        res.status(200).json({ message: "Post deleted successfully" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

module.exports={getPost,getPostById,createPost,updatePostById,deletePost}