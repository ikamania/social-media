import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface User {
  id: number,
  username: string,
  email: string,
  image?: string,
}

const Account = () => {
  const { username } = useParams()
  const { loadByUsername } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!username)
      return

    const fetchUser = async () => {
      const data = await loadByUsername(username)
      setUser(data)
    }
    fetchUser()
  }, [username])
  console.log(user)

  return (
    <>

    </>
  )
}

export default Account
