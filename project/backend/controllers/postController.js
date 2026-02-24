import expressAsyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import mongoose from 'mongoose';

const getPosts = expressAsyncHandler(async (req, res) => {

  const userId = req.user?.id
    ? new mongoose.Types.ObjectId(req.user.id)
    : null;

  const posts = await Post.aggregate([
    { $match: {} },
    {
      $addFields: {
        reactionSum: {
          $sum: {
            $map: {
              input: '$reactions',
              as: 'reaction',
              in: { $cond: { if: '$$reaction.positive', then: 1, else: -1 } }
            }
          }
        },
        userReactionType: {
          $let: {
            vars: {
              r: {
                $first: {
                  $filter: {
                    input: '$reactions',
                    as: 'reaction',
                    cond: { $eq: ['$$reaction.user', userId] }
                  }
                }
              }
            },
            in: {
              $cond: [
                { $ifNull: ['$$r', false] },
                { $cond: ['$$r.positive', 'positive', 'negative'] },
                null
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        reactions: 0
      }
    }
  ]);

  res.status(200).json(posts);
})

const createPost = expressAsyncHandler(async (req, res) => {
  if (!req.file || !req.body) {
    res.status(400)
    throw new Error('Missing fields')
  }

  const post = await Post.create({
    user: req.user.id,
    user_name: req.user.name,
    title: req.body.title,
    image: req.file.buffer,
    contentType: req.file.mimetype
  })

  res.status(201).json({ id: post.id, user_id: post.id, title: post.title, contentType: post.contentType })
})

const updatePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
  res.status(200).json(updatedPost)
})

const deletePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await post.deleteOne()
  res.status(200).json({ id: req.params.id })
})

export { getPosts, createPost, updatePost, deletePost }