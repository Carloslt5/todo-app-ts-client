import { useEffect, useState } from 'react'
import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'
import { TodoData } from '../../types/Todo.type'
import todoservices from '../../services/ToDo.services'

const ProfilePage = () => {

  const [todoData, setTodoData] = useState<TodoData[]>()

  const loadToDos = async () => {
    try {
      const { data } = await todoservices.getAllToDos()
      setTodoData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadToDos()
  }, [])

  // const addTodoHandler = (newTodo: TodoData) => {
  //   setTodoData([...todoData, newTodo])
  // }

  // const updateTodoHandler = (todoID: number) => {
  //   setTodoData(todoData.map(todo => todo.id === todoID
  //     ? { ...todo, completed: !todo.completed }
  //     : todo
  //   ))
  // }

  // const deleteTodoHandler = (todoID: number) => {
  //   setTodoData(todoData.filter(todo => todo.id !== todoID))
  // }

  // const fileredTodo = (filter: string) => {
  //   switch (filter) {
  //     case ('All'):
  //       return todoData
  //     case ('Active'):
  //       return todoData.filter(todo => !todo.completed)
  //     case ('Completed'):
  //       return todoData.filter(todo => todo.completed)
  //   }

  // }

  // const clearCompleted = () => {
  //   setTodoData(todoData.filter(todo => !todo.completed))
  // }

  return (
    <>
      <div className='container px-2 mx-auto max-w-screen-lg '>
        <div>ProfilePage</div>
        <NewTodo />
        {!todoData
          ? <h1>Loading...</h1>
          : <TodoList
            todoslist={todoData}
          />
        }
        {/* {!todoData
          ? <h1>Loading...</h1>
          : <TodoList
            todolist={todoData}
          // UpdateTodo={updateTodoHandler}
          // DeleteTodo={deleteTodoHandler}
          // ClearCompleted={clearCompleted}
          />
        } */}

      </div>
    </>
  )
}

export default ProfilePage