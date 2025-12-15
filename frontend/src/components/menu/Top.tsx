import { useAuth } from "../../context/AuthContext"
import ProfilePicture from "../post/ProfilePicture"
import { TbLetterM } from "react-icons/tb"
import Search from "./Search.tsx"

const Top = () => {
  const { user } = useAuth()

  return (
    <div className="w-full h-[4rem] p-[1rem] relative">
      <ProfilePicture
        image={user?.image}
        css="!w-[2.5rem] !h-[2.5rem]"
        to={`${user?.username}`}
      />
      <TbLetterM className="
        text-[1.7rem] absolute left-1/2 -translate-x-1/2
        top-1/2 -translate-y-1/2
      " />
      <Search />
    </div>
  )
}

export default Top
