import { useAuth } from "../../context/AuthContext"
import ProfilePicture from "../post/ProfilePicture"

const Top = () => {
  const { user } = useAuth()

  return (
    <div className="w-full h-[4rem] p-[1rem]">
      <ProfilePicture
        image={user?.image}
        css="!w-[2.5rem] !h-[2.5rem]"
        to={`${user?.username}`}
      />
    </div>
  )
}

export default Top
