import { FaImage, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to={'/'}>Poster</Link>
      </div>
      <ul>
        {user ? (
          <>
            {window.location.pathname === '/' ? (
              <li>
                <Link to={'/create-post'}>
                  <button className='btn'>
                    <FaImage /> Create Post
                  </button>
                </Link>
              </li>
            ) : (
              <li>
                <Link to={'/'}>
                  <button className='btn'>
                    <FaUser /> Dashboard
                  </button>
                </Link>
              </li>
            )
            }
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            < li >
              <Link to={'/login'}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={'/register'}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )
        }
      </ul >
    </header >
  )
}
export default Header