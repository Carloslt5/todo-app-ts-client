import { TodoData } from './Todo.type'

export interface TodoList {
  todoslist: TodoData[],
}

export interface TodoListProps extends TodoList {
  // UpdateTodo: (todoID: number) => void
  // DeleteTodo: (todoID: number) => void
  // ClearCompleted: () => void
  // FilteredTodo: (filter: string) => void
}