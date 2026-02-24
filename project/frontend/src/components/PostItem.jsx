import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deletePost, downVotePost, upVotePost } from "../features/posts/postSlice";


const PostItem = ({ post }) => {
  const image = `data:${post.contentType};base64,${post.image}`

  const [reactionState, setReactionState] = useState(post.userReactionType)
  const [reactionCnt, setReactionCnt] = useState(post.reactionSum)

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const upVote = () => {
    const wasPositive = reactionState === 'positive'
    const wasNegative = reactionState === 'negative'

    if (wasPositive) {
      setReactionCnt(reactionCnt - 1)
      setReactionState('undefined')
    }
    else if (wasNegative) {
      setReactionCnt(reactionCnt + 2)
      setReactionState('positive')
    }
    else {
      setReactionCnt(reactionCnt + 1)
      setReactionState('positive')
    }

    dispatch(upVotePost(post._id))
  }

  const downVote = () => {
    const wasPositive = reactionState === 'positive'
    const wasNegative = reactionState === 'negative'

    if (wasNegative) {
      setReactionCnt(reactionCnt + 1)
      setReactionState('undefined')
    }
    else if (wasPositive) {
      setReactionCnt(reactionCnt - 2)
      setReactionState('negative')
    }
    else {
      setReactionCnt(reactionCnt - 1)
      setReactionState('negative')
    }

    dispatch(downVotePost(post._id))
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="side"></div>
        <div className="middle" ><b>{post.title}</b><span style={{ color: '#828282', marginLeft: '5px' }}>({post.user_name})</span></div>
        {post.user === user?._id ?
          (<button className="btn side" onClick={() => { dispatch(deletePost(post._id)) }}>X</button>) : (<div className="side"></ div>)
        }
      </div>
      <img src={image} style={{ maxWidth: '100%', borderRadius: '20px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <b style={{ margin: '0 20px', minWidth: '30px', fontSize: '25px' }}> {reactionCnt} </b>
        <button className="btn btn-icon" style={{ background: reactionState === 'positive' ? 'green' : 'black' }} onClick={upVote} ><FaArrowAltCircleUp /></button>
        <button className="btn btn-icon" style={{ background: reactionState === 'negative' ? 'red' : 'black' }} onClick={downVote} ><FaArrowAltCircleDown /></button>
      </div>
    </div >
  )
}
export default PostItem