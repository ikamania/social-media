import type { SetStateAction, Dispatch } from "react"
import CloseButton from "../post/CloseButton"
import Input from "../auth/Input.tsx"
import showAlert from "../showAlert.ts"
import type { User } from "../../types/user.ts"

interface ProfileEditPopUpProps {
  setHidden: Dispatch<SetStateAction<boolean>>,
  user: User,
}

const ProfileEditPopUp = ({ setHidden, user }: ProfileEditPopUpProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[20rem] h-[40rem] rounded-lg relative p-[1.5rem] pt-[3rem]">
        <CloseButton
          text="×"
          onClick={() => setHidden(false)}
          css="top-2 right-2"
        />

        <div className="relative w-full h-fit">
          <Input type="text" placeholder={user.email} disabled={true} />
          <div
            className="absolute inset-0 cursor-not-allowed"
            onClick={() => showAlert("error", "can't change email for now")}
          />
        </div>

        <Input type="text" placeholder={user.username} />
      </div>
    </div>
  )
}

export default ProfileEditPopUp
