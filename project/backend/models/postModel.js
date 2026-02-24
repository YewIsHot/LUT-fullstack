import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  positive: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  user_name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    require: true
  },
  reactions: [reactionSchema]
}, {
  timestamps: true
})

export default mongoose.model('Post', postSchema)