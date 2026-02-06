const defaultClick = (e) =>{
        console.log('No action assigned!')
    }

const Button = ({color = 'steelblue', text, onClick = defaultClick}) => {
  return (
    <button className='btn' onClick={onClick} style={{backgroundColor: color}}>{text}</button>
  )
}
export default Button