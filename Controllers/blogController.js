const Blog=require("../Models/blogModel")


// Get all Blogs
const getPost=async (req,res) => {
    try {
        const posts = await Blog.find(); 
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
}



const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Blog.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




const createPost = async (req, res) => {
  try {
      const { title, description } = req.body;
      const userId = req.user.id; // Extract the user ID from the request object

      // Create a new blog post
      const newPost = await Blog.create({ userId, title, description });

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