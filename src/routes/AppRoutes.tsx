import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import AboutPage from '@/pages/AboutPage/AboutPage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import SignupPage from '@/pages/SignupPage/SignupPage'
import PrivateRoutes from '@/routes/PrivateRoutes'
import KanbanBoardPage from '@/pages/KanbanBoardPage/KanbanBoardPage'
import ProjectPage from '@/pages/ProjectPage/ProjectPage'
import BoardPage from '@/pages/BoardPage/BoardPage'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import NotFound from '@/pages/NonFound/NonFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='*' element={<NotFound />} />

      <Route element={<>
        <Breadcrumbs />
        <PrivateRoutes />
      </>
      }>
        <Route path='/:id' element={<BoardPage />} />
        <Route path='/:id/:kanbanBoardId' element={<KanbanBoardPage />} />
        <Route path='/:id/:kanbanBoardId/:projectId' element={<ProjectPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes