import CloseButton from "../post/CloseButton"
import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"

export interface SimpleUser {
  username: string,
  image: string,
}

interface FollowBoxProps {
  label: string,
  count: number,
  users: SimpleUser[] | [],
  onClose: () => void,
}

export const FollowBox = ({ label, count, users, onClose }: FollowBoxProps) => {
  const goToUser = (username: string) => {
    window.location.href = `/${username}`
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="
        w-[20rem] h-[25rem] relative border-1 border-gray-400 bg-white rounded-2xl
        p-[1rem]
      ">
        <CloseButton
          text="×"
          onClick={onClose}
          css="top-2 right-2"
        />
        <p className="font-bold flex justify-center mb-[1rem]">{label} {count}</p>
        <div className="overflow-y-auto max-h-[15rem] flex flex-col gap-[.7rem]">
          {users.map(user => (
            <div className="flex font-medium text-[.9rem] items-center">
              <img
                onClick={() => goToUser(user.username)}
                src={user.image || testphoto2}
                className="w-[2.5rem] h-[2.5rem] mr-[.4rem] rounded-full cursor-pointer"
              />
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
