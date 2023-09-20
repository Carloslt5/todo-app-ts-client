import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { TodoData } from '../types/Todo.type'

class ToDoServices {

  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_API_URL
    })
    this.instance.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers['Authorization'] = `Bearer ${storedToken}`
      }

      return config
    }, (error) => {
      return Promise.reject(error)
    })
  }

  getAllToDos(id: string): Promise<AxiosResponse<TodoData[]>> {
    return this.instance.get(`/todos/${id}/getAllTodos`)
  }

  createToDo(newTodo: object, id: string): Promise<AxiosResponse<TodoData>> {
    return this.instance.post(`/todos/${id}/createdTodo`, newTodo)
  }

  updateToDo(_id: number, completed: boolean, id: string): Promise<AxiosResponse<TodoData>> {
    return this.instance.put(`/todos/${id}/updateTodo`, { _id, completed })
  }

  deleteToDo(_id: number, id: string): Promise<AxiosResponse<TodoData>> {
    return this.instance.delete(`/todos/${id}/deleteTodo/${_id}`)
  }

  clearCompleted(id: string) {
    return this.instance.delete(`/todos/${id}/deleteCompletedTodos`)
  }

}

const todoservices = new ToDoServices()
export default todoservices