const  express=require("express");
const {getPost,getPostById,createPost,updatePostById,deletePost}=require("../Controllers/blogController")

const router = express.Router()


router.get('/posts', getPost)
router.get('/posts/:id', getPostById)
router.post('/posts', createPost)
router.put('/posts/:id', updatePostById)
router.delete('/posts/:id', deletePost)
module.exports= router