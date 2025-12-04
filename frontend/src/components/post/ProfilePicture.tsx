import { NavLink } from "react-router-dom"
import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"
import { url } from "../../context/AuthContext.tsx"

interface ProfilePictureProps {
  image?: string,
  to?: string,
  css?: string,
}

const ProfilePicture = ({ image, css, to }: ProfilePictureProps) => {
  return (
    <NavLink to={`${url}/${to}`}>
      <img src={image ?? testphoto2} className={`
      w-[3rem] h-[3rem] object-cover 
      rounded-full mr-[.5rem] ${css}
    `} />
    </NavLink>
  )
}

export default ProfilePicture
