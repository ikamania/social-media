import ProfilePicture from "./ProfilePicture"
import { FaRegImage } from "react-icons/fa6"
import { FaRegSmileBeam } from "react-icons/fa"
import { useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import showAlert from "../showAlert"
import CloseButton from "./CloseButton.tsx"

interface UploadBoxProps {
  upload: (token: string, content: string, file?: File, postId?: number) => Promise<void>,
  buttonText: string,
  placeholder: string,
  postId?: number,
}

const UploadBox = ({ upload, buttonText, placeholder, postId }: UploadBoxProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const { token } = useAuth()
  const access = token?.access ?? ""

  const handleText = () => {
    if (textRef.current) {
      textRef.current.style.height = "auto"
      textRef.current.style.height = textRef.current.scrollHeight + "px"
    }
  }

  const handlePost = async () => {
    if (!textRef.current)
      return
    const content = textRef.current.value.trim()

    if (!content)
      showAlert("error", "post can not be emty")

    try {
      await upload(access, content, selectedImage ?? undefined, postId ?? undefined)

      textRef.current.value = ""
      textRef.current.style.height = "auto"
      setSelectedImage(null)
    } catch (error) {
      showAlert("error", "internal error")
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  return (
    <div className="w-full p-[1rem] flex border-b-1 border-gray-100">
      <ProfilePicture />

      <div className="w-full">
        <div className="w-full flex-row items-center">
          <textarea placeholder={placeholder}
            ref={textRef}
            onInput={handleText}
            rows={1}
            className="
            mb-[.5rem] text-[1.2rem] outline-none resize-none
            w-full overflow-hidden pt-[.5rem] text-gray-800
            "/>
          {selectedImage && (
            <div className="relative w-fit">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="IMG"
                className="object-cover rounded-2xl mb-[.5rem]"
              />
              <CloseButton
                text="×"
                onClick={() => setSelectedImage(null)}
                css="top-1 right-2 text-[1.4rem]"
              />
            </div>
          )}
        </div>

        <div className="w-full flex justify-between">
          <div className="
          flex items-center text-blue-400 text-[1.2rem]
          gap-2
        ">
            <FaRegImage
              className="cursor-pointer"
              onClick={() => fileRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileRef}
              onChange={handleImageSelect}
            />
            <FaRegSmileBeam className="cursor-pointer" />
          </div>
          <button
            onClick={handlePost}
            className="
          w-[4rem] h-[2rem] text-white font-bold bg-gray-400
          rounded-2xl p-[.3rem] cursor-pointer
        ">{buttonText}</button>
        </div>
      </div>
    </div>
  )
}

export default UploadBox
