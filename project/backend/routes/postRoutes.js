import express from 'express'
import multer from 'multer'
import {
    getPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController.js'
import { voteOnPost } from '../controllers/postReactionController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });
router.route('/').get(protect, getPosts).post(protect, upload.single('image'), createPost)
router.route('/:id').put(protect, updatePost).delete(protect, deletePost).post(protect, voteOnPost)

export default router
