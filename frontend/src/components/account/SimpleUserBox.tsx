import type { SimpleUser } from "../../types/user"
import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"

interface SimpleUserBoxProps {
  user: SimpleUser
}

const SimpleUserBox = ({ user }: SimpleUserBoxProps) => {
  const goToUser = () => {
    window.location.href = `/${user.username}`
  }

  return (
    <div className="flex font-medium text-[.9rem] items-center">
      <img
        onClick={goToUser}
        src={user.image || testphoto2}
        className="w-[2.5rem] h-[2.5rem] mr-[.4rem] rounded-full cursor-pointer"
      />
      <p className="text-gray-600 font-medium pr-[.3rem]">
        {user.name} {user.surname}
      </p>
      <p className="font-bold text-black/80">
        - @{user.username}
      </p>
    </div>
  )
}

export default SimpleUserBox
