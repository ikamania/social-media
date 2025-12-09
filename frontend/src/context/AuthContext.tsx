import { createContext, useContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import showAlert from "../components/showAlert"
import { type User } from "../types/user.ts"

interface AuthContextType {
  token: any | null,
  setToken: (token: any | null) => void,
  login: (email: string, password: string) => Promise<void>,
  logout: () => void,
  register: (email: string, username: string, name: string, surname: string, password: string) => Promise<void>,
  validToken: () => Promise<boolean>,
  loadUser: () => void,
  loadByUsername: (username: string) => Promise<any>,
  user: User | null,
  updateUser: (formData: FormData) => Promise<any>,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const url = "http://localhost:8000"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("token")

    return stored ? JSON.parse(stored) : null
  })
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const loadUser = async () => {
    if (!token)
      return

    try {
      const response = await fetch(`${url}/users/me/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token?.access}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok)
        showAlert("error", "failed to load user")
      else {
        const data = await response.json()
        setUser(data)
      }

    } catch {
      showAlert("error", "internal error while loading user")
    }
  }

  const loadByUsername = async (username: string) => {
    try {
      const response = await fetch(`${url}/users/by-username/${username}/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token?.access}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok)
        showAlert("error", "failed to load user")
      else {
        const data = await response.json()

        return data
      }
    } catch {
      showAlert("error", "internal erorr while loading user")
    }
  }

  const register = async (email: string, username: string, name: string, surname: string, password: string) => {
    if (!email || !username || !name || !surname || !password) {
      showAlert("error", "fill out all forms")
      return
    }

    try {
      const response = await fetch(`${url}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          name: name,
          surname: surname,
          password: password,
        })
      })
      if (response.ok) {
        showAlert("success", "signed up")
        navigate("/auth/login")
      } else {
        const errorText = await response.text()

        showAlert("error", errorText)
      }
    } catch {
      showAlert("error", "internal error")
    }
  }

  const updateUser = async (formData: FormData) => {
    try {
      const response = await fetch(`${url}/users/${user?.id}/`, {
        method: "PATCH",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token?.access}`,
        },
      })

      if (!response) {
        showAlert("error", "failed to update user")
      } else {
        showAlert("success", "updated user")
        navigate("/")
      }
    } catch {
      showAlert("error", "internal error")
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${url}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data)

        localStorage.setItem("token", JSON.stringify(data))

        showAlert("success", "signed in")
        navigate("/")
      } else {
        showAlert("error", "invalid creadentials")
      }
    } catch (error) {
      showAlert("error", "internal error")
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")

    showAlert("success", "logged out")

    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
  }

  const validToken = async (): Promise<boolean> => {
    if (!token?.access)
      return false

    try {
      const response = await fetch(`${url}/api/token/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token?.access })
      })
      if (response.ok)
        return true

      if (token.refresh) {
        const response = await fetch(`${url}/api/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refresh: token.refresh })
        })

        if (response.ok) {
          const data = await response.json()

          const newToken = { ...token, access: data.access }

          setToken(newToken)
          localStorage.setItem("token", JSON.stringify(newToken))

          return true
        }
      }

      setToken(null)
      localStorage.removeItem("token")

      return false
    } catch (error) {
      showAlert("error", "internal error")

      return false
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, register, validToken, loadUser, loadByUsername, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
