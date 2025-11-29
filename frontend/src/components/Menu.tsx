import Top from './menu/Top.tsx'
import Feed from './menu/Feed.tsx'

const Menu = () => {
  return (
    <>
      <div className="md:hidden">
        <Top />
      </div>

      <Feed />
    </>
  )
}

export default Menu
