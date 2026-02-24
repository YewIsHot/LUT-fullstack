import expressAsyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

const voteOnPost = expressAsyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Missing fields')
  }

  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const userReactions = post.reactions.filter((reaction) =>
    reaction.user.toString() === req.user.id
  )

  const hasSameReaction = userReactions.some((reaction) =>
    reaction.user.toString() === req.user.id && reaction.positive === req.body.positive
  )

  if (userReactions.length > 0) {
    post.reactions = post.reactions.filter((reaction) =>
      reaction.user.toString() !== req.user.id
    )
  }

  if (!hasSameReaction) {
    post.reactions.push({ user: req.user.id, positive: req.body.positive })
  }

  await post.save();
  res.status(200).json({ post: post.id, positive: req.body.positive })
})


export { voteOnPost }