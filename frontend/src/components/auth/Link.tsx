import { NavLink } from "react-router-dom"

interface LinkProps {
  text: string
  to?: string
}

const Link = ({ text, to = "" }: LinkProps) => {
  return (
    <NavLink to={to} className="text-blue-700">{text}</NavLink>
  )
}

export default Link
