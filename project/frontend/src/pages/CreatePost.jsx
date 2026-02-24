import { useState, useEffect, useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost, reset } from '../features/posts/postSlice.js'
import Spinner from '../components/Spinner.jsx'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [inputKey, setInputKey] = useState(Date.now()); // unique key for input

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { postCreated, isLoading, isError, isSuccess, message } = useSelector((state) => state.posts)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }

    if (postCreated) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, postCreated, message, navigate, dispatch])

  const onChange = (e) => {
    setTitle(e.target.value)
  }

  const onFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append('image', image)
    form.append('title', title)
    dispatch(createPost(form))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaImage /> New Post
          <p>Create a post</p>
        </h1>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-controll" id='title' name='title' value={title} placeholder='Enter a title' onChange={onChange} />
          </div>
          <div className="form-group form-file">
            <label htmlFor='image' className='btn'>Upload Image</label>
            {image ? (
              <>
                <button className='btn' onClick={(e) => { e.preventDefault(); setImage(''); setInputKey(Date.now()); }}>Cancel</button>
                <div>{image.name}</div>
              </>
            ) : <div>No File Chosen</div>}
            <input key={inputKey} type="file" style={{ display: 'none' }} className="form-controll" id='image' name='image' onChange={onFileChange} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default CreatePost