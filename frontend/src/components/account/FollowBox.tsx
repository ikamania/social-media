import CloseButton from "../post/CloseButton"
import type { SimpleUser } from "../../types/user"
import SimpleUserBox from "./SimpleUserBox"

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
            <SimpleUserBox user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}
