import { MdClose } from 'react-icons/md'
import React, { useContext, useState } from 'react'
import projectservices from '../../services/project.services'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import { useParams } from 'react-router-dom'

interface ProjecFormProprs {
  kanbanID: string
  modalTitle: string
  onCancel: () => void
}

const ProjectForm: React.FC<ProjecFormProprs> = ({ modalTitle, kanbanID, onCancel }) => {
  const { kanbanBoardId } = useParams()
  const { loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [newProjectData, setNewProjectData] = useState({
    title: '',
    description: '',
  })

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewProjectData((prevBoard) => ({ ...prevBoard, [name]: value, }))
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (kanbanBoardId) {
        await projectservices.createProject(newProjectData, kanbanID)
        setNewProjectData({ title: '', description: '' })
        onCancel()
        loadKanbanBoard(kanbanBoardId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { title, description } = newProjectData

  return (
    <div
      className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white '>{modalTitle}</h1>
        <button
          className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
          onClick={onCancel}
        >
          <MdClose />
        </button>
      </div>
      <hr className='mb-4' />
      <form
        className='flex flex-col gap-2 text-white'
        onSubmit={todoSubmithandler}
      >
        <input
          autoFocus
          className='input-primary'
          type='text'
          name='title'
          value={title}
          placeholder='Insert title...'
          onChange={handlerInputChange}
        />
        <input
          className='input-primary'
          type='text'
          name='description'
          value={description}
          placeholder='Insert description...'
          onChange={handlerInputChange}
        />
        <div className='flex justify-between gap-2 mt-4 items-strech'>
          <button
            className='flex items-center gap-2 btn-add'
          >
            <span>Add Project</span>
          </button>
        </div>
      </form >
    </div>

  )
}

export default ProjectForm