import { NavLink, type NavLinkProps } from "react-router-dom"

interface ActiveLinkProps extends NavLinkProps {
  children: React.ReactNode
}

const ActiveLink = ({ children, ...props }: ActiveLinkProps) => {
  return (
    <NavLink
      {...props}
      className="w-full h-full flex justify-center hover:bg-gray-200"
    >
      {({ isActive }) => (
        <span className={`relative flex items-center h-full ${isActive ? "font-bold" : "text-gray-500 font-medium"}`}>
          {children}
          {isActive && (
            <span className="absolute h-1 w-full left-0 bottom-0 bg-blue-400 rounded-full"></span>
          )}
        </span>
      )
      }
    </NavLink>
  )
}

const Feed = () => {
  return (
    <div className="w-full h-[3rem] flex pb-[.1rem] border-b-1 border-gray-100">
      <ActiveLink to="/">For you</ActiveLink>
      <ActiveLink to="/following">Following</ActiveLink>
    </div>
  )
}

export default Feed
