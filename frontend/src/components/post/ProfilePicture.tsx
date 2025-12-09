import { NavLink } from "react-router-dom"
import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"

interface ProfilePictureProps {
  image?: string,
  to: string,
  css?: string,
}

const ProfilePicture = ({ image, css, to }: ProfilePictureProps) => {
  return (
    <NavLink className="h-fit" to={`/${to}`}>
      <img src={image ?? testphoto2} className={`
      w-[2.7rem] h-[2.7rem] object-cover rounded-full mr-[1rem] ${css}
      transition-transform duration-300 hover:scale-110
    `} />
    </NavLink>
  )
}

export default ProfilePicture
