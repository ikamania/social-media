import { NavLink, type NavLinkProps } from "react-router-dom"

interface AuthBoxProps extends NavLinkProps {
  text: string;
  css?: string;
}

const AuthBox = ({ text, css, ...props }: AuthBoxProps) => {
  return (
    <NavLink
      {...props}
      className={`
        w-full h-[2.7rem] rounded-full flex justify-center items-center cursor-pointer
        my-[1rem] text-[.9rem] font-bold ${css ?? "border-1 border-gray-200"}
      `}>
      {text}
    </NavLink>
  )
}

export default AuthBox
