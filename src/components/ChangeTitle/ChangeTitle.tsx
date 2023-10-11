
import { MdClose, MdModeEdit } from 'react-icons/md'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'
import { ITicketData } from '../../types/Ticket.type'
import { useState } from 'react'
import { ProjectData } from '../../types/Project.type'
import { EditedContent } from '../../contexts/ticket.context'

interface ChangeTitleProps {
  data: ITicketData | IKanbanBoardData | ProjectData
  entityId: string
  variant?: 'title-page'
  updateEntity: (entityId: string) => void
  updateEntityTitle: (projectId: string, editedContent: EditedContent) => Promise<void>
}

const ChangeTitle: React.FC<ChangeTitleProps> = ({ data: { _id, title }, entityId, variant, updateEntityTitle, updateEntity }) => {
  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState<EditedContent>({
    title: title,
  })
  const handlerEditClick = () => {
    setEditing(!isEditing)
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent({
      ...editedContent,
      title: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await updateEntityTitle(_id, editedContent)
      setEditing(false)
      updateEntity(entityId)
    } catch (error) {
      console.log(error)
    }
  }

  const titleClassName = variant === 'title-page'
    ? 'title-primary'
    : 'w-full text-2xl'
  const inputClassName = variant === 'title-page'
    ? 'input-primary'
    : 'input-standard'
  const buttonClassName = variant === 'title-page'
    ? 'p-6'
    : 'p-2'

  return (
    <div className='flex items-stretch justify-between w-full gap-2'>
      {
        !isEditing
          ? <h1
            className={titleClassName}
            onClick={handlerEditClick}
          >
            {title}
          </h1>
          : <form
            onSubmit={todoSubmithandler}
            className='flex w-full text-2xl'>
            <input
              autoFocus
              onBlur={handlerEditClick}
              onChange={handlerInputChange}
              type='text'
              name='title'
              value={editedContent.title}
              className={inputClassName}
              placeholder={title}
              required />
          </form>
      }
      <div className='edit-title'>
        <button
          className={buttonClassName}
          onClick={handlerEditClick}
        >
          {isEditing ? <MdClose /> : <MdModeEdit />}
        </button>
      </div>
    </div>)
}

export default ChangeTitle