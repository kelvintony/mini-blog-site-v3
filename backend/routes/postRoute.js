import express from 'express';

const router = express.Router();

//import controllers
import { getPosts, createPost, deletePost, updatePost, getPost, likePost } from '../controllers/post.js';
import auth from '../middleware/auth.js';

router.get('/', getPosts);
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);
router.put('/:id', auth, updatePost);
router.get('/:id', auth, getPost);
router.put('/:id/likepost', likePost); //i will add like later

export default router;
