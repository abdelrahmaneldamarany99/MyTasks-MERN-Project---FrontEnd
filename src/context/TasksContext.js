import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const TasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TaskS':
      return { 
        Tasks: action.payload 
      }
    case 'CREATE_Task':
      return { 
        Tasks: [action.payload, ...state.Tasks] 
      }
    case 'DELETE_Task':
      return { 
        Tasks: state.Tasks.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, { 
    Tasks: null
  })
  
  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TasksContext.Provider>
  )
}