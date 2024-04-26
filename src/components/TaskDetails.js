import { useTasksContext } from '../hooks/useTasksContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TaskDetails = ({ Task }) => {
  const { dispatch } = useTasksContext()

  const handleClick = async () => {
    const response = await fetch('/api/Tasks/' + Task._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_Task', payload: json})
    }
  }

  return (
    <div className="Task-details">
      <h4>{Task.task}</h4>
      <p><strong>Importance ( 0 to 5 ): </strong>{Task.importance}</p>
      <p><strong>Deadline: </strong>{Task.deadline}</p>
      <p>{formatDistanceToNow(new Date(Task.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TaskDetails