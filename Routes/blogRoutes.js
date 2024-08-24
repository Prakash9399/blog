const  express=require("express");
const {getPost,getPostById,createPost,updatePostById,deletePost}=require("../Controllers/blogController")

const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken');


router.get('/posts', getPost)
router.get('/posts/:id', getPostById)
router.post('/posts',authenticateToken, createPost)
router.put('/posts/:id',authenticateToken, updatePostById)
router.delete('/posts/:id',authenticateToken, deletePost)
module.exports= router