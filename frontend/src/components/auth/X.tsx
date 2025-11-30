import { NavLink } from "react-router-dom"
import { IoMdClose } from "react-icons/io"

const X = () => {
  return (
    <NavLink to="/auth" className="text-[1.5rem] w-fit h-[4rem] flex items-center p-[1rem]">
      <IoMdClose color="#6B7280" />
    </NavLink>
  )
}

export default X
