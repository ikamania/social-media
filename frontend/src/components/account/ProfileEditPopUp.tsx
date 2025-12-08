import type { SetStateAction, Dispatch } from "react"
import { useState, useRef } from "react"
import CloseButton from "../post/CloseButton"
import Input from "../auth/Input.tsx"
import showAlert from "../showAlert.ts"
import type { User } from "../../types/user.ts"
import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"
import { useAuth } from "../../context/AuthContext.tsx"

interface ProfileEditPopUpProps {
  setHidden: Dispatch<SetStateAction<boolean>>,
  user: User,
}

const ProfileEditPopUp = ({ setHidden, user }: ProfileEditPopUpProps) => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const { updateUser } = useAuth()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  const handleProfileUpdate = () => {
    const formData = new FormData()
    const fields: Record<string, string> = {
      username: username,
      name: name,
      surname: surname,
    }

    Object.entries(fields).forEach(([key, val]) => {
      if (val.trim()) {
        formData.append(key, val.trim())
      }
    })
    if (selectedImage) {
      formData.append("image", selectedImage)
    }
    if ([...formData.entries()].length === 0) {
      showAlert("error", "nothing to update")
      return
    }
    updateUser(formData)
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[20rem] rounded-lg relative p-[1.5rem] pt-[3rem]">
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

        <Input type="text" placeholder={user.username} value={username} onChange={setUsername} />
        <Input type="text" placeholder={user.name} value={name} onChange={setName} />
        <Input type="text" placeholder={user.surname} value={surname} onChange={setSurname} />
        <div className="flex items-center mt-2">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : (user?.image || testphoto2)}
            className={`
            w-[4rem] h-[4rem] object-cover rounded-full mr-[1rem]
          `} />
          <button
            className="
              w-full h-[2rem] border-1 rounded-2xl border-gray-500
              text-[.9rem] text-gray-500 hover:bg-gray-100 transition-colors
              duration-300 cursor-pointer
            "
            onClick={() => fileRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileRef}
              onChange={handleImageSelect}
            />
            Change pfp
          </button>
        </div>
        <button
          className="
            w-full h-[3rem] border-1 border-gray-500 mt-[1rem] rounded-2xl
            hover:bg-gray-100 transition-colors duration-300 font-bold text-[.9rem]
            cursor-pointer
          "
          onClick={handleProfileUpdate}
        >
          Update profile
        </button>
      </div>
    </div>
  )
}

export default ProfileEditPopUp
