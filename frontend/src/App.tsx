import { Routes, Route, Navigate } from 'react-router-dom'

import Account from "./pages/Account.tsx"
import ForYou from './pages/ForYou.tsx'
import Following from './pages/Following.tsx'
import Auth from './pages/Auth.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Loading from './pages/Loading.tsx'
import { useAuth } from './context/AuthContext.tsx'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

function App() {
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { validToken } = useAuth()
    const [allowed, setAllowed] = useState<boolean | null>(null)

    useEffect(() => {
      const check = async () => {
        const valid = await validToken()
        setAllowed(valid)
      }
      check()
    }, [])

    if (allowed === null)
      return <Loading />

    if (!allowed)
      return <Navigate to="/auth" />

    return children
  }

  return (
    <div className="w-screen min-w-[20rem] min-h-screen flex justify-center">
      <div className="w-full max-w-[35rem] border-1 border-gray-100">
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <ForYou />
            </ProtectedRoute>
          }></Route>
          <Route path='/following' element={
            <ProtectedRoute>
              <Following />
            </ProtectedRoute>
          }></Route>
          <Route path='/:username' element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }></Route>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/register' element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
