import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProjectInsights from './pages/ProjectInsights.jsx'
import Projects from './pages/Projects.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId/insights" element={<ProjectInsights />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
