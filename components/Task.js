import {FaTimes} from 'react-icons/fa'

const Task = ({task , onDelete , onToggle}) => {
  return (
    // set style of the div to empty when reminder is false and to reminder style in css
    // which is left green border when reminder is true. this can be changed on double click
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick ={() => onToggle(task.id)}>
        <h3> {task.text}
        {/* // delete specific task when clicked */}
         <FaTimes style={{ color: 'red', cursor : 'pointer'}} onClick={
            () => onDelete(task.id) 
         } />
        </h3>
        <p>{task.day}</p>
        
    </div>
  )
}

export default Task