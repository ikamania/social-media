import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"

interface ProfilePictureProps {
  image?: string,
  to?: string,
}

const ProfilePicture = ({ image }: ProfilePictureProps) => {
  return (
    <img src={image ?? testphoto2} className="
      w-[3rem] h-[3rem] object-cover 
      rounded-full mr-[.5rem]
    " />
  )
}

export default ProfilePicture
