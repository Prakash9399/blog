const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

// Check if the model is already compiled, otherwise compile it
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

module.exports = Blog;
