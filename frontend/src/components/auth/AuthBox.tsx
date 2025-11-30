import { NavLink, type NavLinkProps } from "react-router-dom"
import type { IconType } from "react-icons"

interface AuthBoxProps extends NavLinkProps {
  text: string;
  css?: string;
  icon?: IconType;
}

const AuthBox = ({ text, css, icon: Icon, ...props }: AuthBoxProps) => {
  return (
    <NavLink
      {...props}
      className={`
        w-full h-[2.7rem] rounded-full flex justify-center items-center cursor-pointer
        my-[1rem] text-[.9rem] font-bold border-1 border-gray-200 ${css ?? ""}
      `}>
      {Icon && <Icon color="black" size={22} className="mr-[.5rem]" />}
      {text}
    </NavLink>
  )
}

export default AuthBox
