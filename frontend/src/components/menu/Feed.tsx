import ActiveLink from "./ActiveLink"

const Feed = () => {
  return (
    <div className="w-full h-[3.5rem] flex pb-[.1rem] border-b-1 border-gray-100">
      <ActiveLink to="/">For you</ActiveLink>
      <ActiveLink to="/following">Following</ActiveLink>
    </div>
  )
}

export default Feed
