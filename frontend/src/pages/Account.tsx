import { useEffect, useState } from "react"
import { Navigate, NavLink, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { IoIosArrowRoundBack } from "react-icons/io"
import testphoto2 from "../assets/5HdM0_7C_400x400.jpg"
import showAlert from "../components/showAlert"

interface User {
  id: number,
  username: string,
  email: string,
  image?: string,
}

const Account = () => {
  const { username } = useParams()
  const { user, loadUser, loadByUsername } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)

  const load = async () => {
    if (!username)
      return

    try {
      const data = await loadByUsername(username)
      setProfile(data)

      if (!user) {
        loadUser()
      }
    } catch {
      showAlert("error", "internal error")
    }
  }

  useEffect(() => {
    if (!profile)
      load()
  }, [username])

  return (
    <div>
      <div className="
        w-full h-[4rem] text-[2rem] flex items-center p-[1rem]
        gap-[2.5rem]
        ">
        <NavLink to="/">
          <IoIosArrowRoundBack />
        </NavLink>
        <div className="relative text-[.8rem] text-gray-500">
          <p
            className="text-[1.3rem] text-black font-bold"
          >{profile?.username}</p>
          <p>0 posts</p>
        </div>
      </div>
      <div className="w-full h-[13rem] bg-gray-300 relative">
        <img src={profile?.image ?? testphoto2} className="
          w-36 h-36 object-cover absolute rounded-full -bottom-18
          left-10 border-[.3rem] border-white
        "/>
      </div>
      <div className="w-full h-[4rem] flex justify-end items-center pr-[2rem]">
        {user?.email == profile?.email &&
          <p className="
            font-bold text-[.9rem] border-1 border-gray-300 
            px-[.8rem] py-[.5rem] rounded-full cursor-pointer
          "
          >Set up profile</p>
        }
      </div>
      <div className="p-[1.2rem]">
        <p className="font-bold text-[1.2rem]">{profile?.username}</p>
        <p className="text-gray-500">{profile?.email}</p>
      </div>
    </div>
  )
}

export default Account
