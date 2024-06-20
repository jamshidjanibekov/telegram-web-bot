import './card.css'
import Button from "../button/button.jsx";
import {useState} from "react";
const Card = (props) =>{
  const [count, setCount] = useState(0)
  const {course, onAddItem, onRemoveItem} = props
  const handleIncrement = () => {
    setCount(prev => prev + 1)
    onAddItem(course)
  }
  const handleDecrement = () => {
    setCount(prev => prev - 1)
    onRemoveItem(course)
  }
  return (
    <div className='card'>
      <span className={`${count !== 0 ? 'card__badge' : 'card__badge-hidden'}`}>{count}</span>
      <div className='image__container'>
        <img
            src={course.image}
            alt={course.title}
            width='100%'
            height='230px'
        />
      </div>
      <div className='card__body'>
        <h2>{course.title}</h2>
        <div className='card__price'>
          {course.price.toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
          })}
        </div>
      </div>
        <div className='hr'>

        </div>
      <div className='btn__container'>
        <Button title={'+'} onClick={handleIncrement} type={'add'}/>
        {count !== 0  && (
          <Button title={'-'} onClick={handleDecrement} type={'remove'}/>
        )}

      </div>
    </div>
  )
}
export default Card