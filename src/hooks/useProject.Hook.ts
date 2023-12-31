import { useNavigate, useParams } from 'react-router-dom'
import { ProjectContext, ProjectContextType } from '@/contexts/project.context'
import { EditedContent, TicketContext, TicketContextType } from '@/contexts/ticket.context'
import projectservices from '@/services/project.services'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/contexts/Types/AuthContext.types'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useContext, useEffect } from 'react'

export const useProject = () => {
  const { kanbanBoardId, projectId } = useParams()
  const { user } = useContext(AuthContext) as AuthContextType
  const { projectData, loadProject, deleteProject } = useContext(ProjectContext) as ProjectContextType
  const { loadTicket } = useContext(TicketContext) as TicketContextType

  const navigate = useNavigate()

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
      loadTicket(projectId)
    }
  }, [projectId, loadProject, loadTicket])

  const updateProjectTitle = async (projectId: string, projectTitleData: EditedContent) => {
    await projectservices.updateProject(projectId, projectTitleData)
  }

  const handleDelete = async () => {
    try {
      await deleteProject()
      navigate(`/${user?._id}/${kanbanBoardId}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  return {
    projectId,
    projectData,
    loadProject,
    updateProjectTitle,
    handleDelete
  }

}