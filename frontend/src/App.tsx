import { Routes, Route, Navigate } from 'react-router-dom'

import ForYou from './pages/ForYou.tsx'
import Auth from './pages/Auth.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

interface ProtectedRouteProps {
  children: React.ReactNode
}

function App() {
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token")
    if (!token)
      return <Navigate to="/auth" />

    return children
  }

  return (
    <AuthProvider>
      <div className="w-screen h-screen flex justify-center">
        <div className="w-full max-w-md h-full border-1 border-gray-100">
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <ForYou />
              </ProtectedRoute>
            }></Route>
            <Route path='/auth' element={<Auth />}></Route>
            <Route path='/auth/login' element={<Login />}></Route>
            <Route path='/auth/register' element={<Register />}></Route>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
