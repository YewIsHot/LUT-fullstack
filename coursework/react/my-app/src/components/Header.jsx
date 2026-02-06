import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title = 'Task Tracker', onButtonClick }) => {
  const location = useLocation()
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && <Button color='green' text='Add' onClick={onButtonClick} />}
    </header>
  )
}

// DONT WORK NO MORE
// Header.defaultProps = {
//   title: 'Task Tracker'
// }

Header.propTypes = {
  title: PropTypes.string
}

export default Header